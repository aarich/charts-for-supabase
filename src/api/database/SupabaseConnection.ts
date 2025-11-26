import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createClient,
  Subscription,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { OpenAPIV2 } from 'openapi-types';
import {
  formatParam,
  formatParams,
  getFieldsToSelect,
  handleError,
  log,
  Modifier,
  ModifierType,
  QueryInfo,
  QueryReturnType,
  QueryType,
} from '../../utils';

export const DEFAULT_TABLE_LIMIT = 20;

type Stmt = ReturnType<
  SupabaseClient['rpc'] | ReturnType<SupabaseClient['from']>['select']
>;
export class SupabaseConnection {
  supabase: SupabaseClient;
  user: User | undefined;
  private subscription: Subscription;

  constructor(url: string, key: string) {
    this.supabase = createClient(url, key, {
      auth: { storage: AsyncStorage, throwOnError: true },
    });
    this.subscription = this.supabase.auth.onAuthStateChange((_, session) => {
      this.user = session?.user;
    }).data.subscription;
  }

  async destroy() {
    this.subscription.unsubscribe();
    (await this.supabase.auth.getSession()) && this.supabase.auth.signOut();
  }

  async signIn(email: string, password: string) {
    if (
      !password ||
      (await this.supabase.auth.getUser()).data.user?.email?.toLowerCase() ===
        email.toLowerCase()
    ) {
      // already signed in or password not set
      return;
    }
    log('Signing in to supabase.', { email });
    const { error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
  }

  signOut() {
    this.supabase.auth
      .signOut()
      .then(({ error }) => error && handleError(error))
      .catch(handleError);
  }

  async query(
    qi: QueryInfo,
    schema: OpenAPIV2.Document | undefined
  ): Promise<Stmt> {
    let stmt: Stmt;
    let columnInfos: Record<string, OpenAPIV2.SchemaObject> | undefined;
    if (qi.type === QueryType.RPC) {
      const params = formatParams(qi.rpc, qi.params, schema);
      stmt = this.supabase.rpc(qi.rpc, params);
    } else {
      const options =
        qi.returnInfo.type === QueryReturnType.COUNT
          ? { count: qi.returnInfo.count, head: true }
          : undefined;
      const fields = getFieldsToSelect(qi);
      stmt = this.supabase.from(qi.table).select(fields, options);
      columnInfos = schema?.definitions?.[qi.table]?.properties;
    }

    if (qi.modifiers) {
      qi.modifiers.forEach(
        (modifier) => (stmt = this._applyModifier(stmt, modifier, columnInfos))
      );
    }

    // For a table query without a limit, apply default of 20
    if (
      qi.returnInfo.type === QueryReturnType.TABLE &&
      !qi.modifiers?.find((mod) => mod.type === ModifierType.LIMIT)
    ) {
      stmt = stmt.limit(DEFAULT_TABLE_LIMIT);
    }

    qi.headers?.forEach(([key, value]) => stmt.setHeader(key, value));

    const res = await stmt;
    if (res.error?.message) {
      throw res.error;
    }
    return res;
  }

  _applyModifier(
    stmt: Stmt,
    modifier: Modifier,
    columnInfos: Record<string, OpenAPIV2.SchemaObject> | undefined
  ): Stmt {
    const info =
      'column' in modifier ? columnInfos?.[modifier.column] : undefined;
    const formattedValue =
      'value' in modifier ? formatParam(info, modifier.value) : undefined;

    switch (modifier.type) {
      case ModifierType.EQ:
        return stmt.eq(modifier.column, formattedValue);
      case ModifierType.NEQ:
        return stmt.neq(modifier.column, formattedValue);
      case ModifierType.LT:
        return stmt.lt(modifier.column, formattedValue);
      case ModifierType.GT:
        return stmt.gt(modifier.column, formattedValue);
      case ModifierType.LTE:
        return stmt.lte(modifier.column, formattedValue);
      case ModifierType.GTE:
        return stmt.gte(modifier.column, formattedValue);
      case ModifierType.LIMIT:
        return stmt.limit(parseInt(modifier.value));
      case ModifierType.SORT:
        return stmt.order(modifier.column, { ascending: modifier.asc });
      case ModifierType.IN:
        return stmt.in(modifier.column, modifier.values);
      case ModifierType.LIKE:
        return stmt.like(modifier.column, modifier.value);
    }
  }
}
