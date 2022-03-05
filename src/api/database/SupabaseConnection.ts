import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  PostgrestBuilder,
  PostgrestFilterBuilder,
} from '@supabase/postgrest-js';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { OpenAPIV2 } from 'openapi-types';
import {
  formatParams,
  handleError,
  log,
  Modifier,
  ModifierType,
  QueryInfo,
  QueryReturnType,
  QueryType,
} from '../../utils';

export class SupabaseConnection {
  supabase: SupabaseClient;

  constructor(url: string, key: string) {
    this.supabase = createClient(url, key, { localStorage: AsyncStorage });
  }

  destroy() {
    this.supabase.auth.session() && this.supabase.auth.signOut();
  }

  signIn(email: string, password: string) {
    if (
      !password ||
      this.supabase.auth.user()?.email?.toLowerCase() === email.toLowerCase()
    ) {
      // already signed in or password not set
      return;
    }
    log('Signing in to supabase.', { email });
    this.supabase.auth
      .signIn({ email, password })
      .then(({ error }) => error && handleError(error))
      .catch(handleError);
  }

  signOut() {
    this.supabase.auth
      .signOut()
      .then(({ error }) => error && handleError(error))
      .catch(handleError);
  }

  get user() {
    return this.supabase.auth.user();
  }

  query(
    qi: QueryInfo,
    schema: OpenAPIV2.Document | undefined
  ): PostgrestBuilder<Record<string, unknown>> {
    let stmt: PostgrestFilterBuilder<Record<string, unknown>>;
    if (qi.type === QueryType.RPC) {
      const params = formatParams(qi.rpc, qi.params, schema);
      stmt = this.supabase.rpc(qi.rpc, params);
    } else {
      const options =
        qi.returnInfo.type === QueryReturnType.COUNT
          ? { count: qi.returnInfo.count, head: true }
          : undefined;
      stmt = this.supabase.from(qi.table).select(qi.select, options);
    }

    if (qi.modifiers) {
      qi.modifiers.forEach(
        (modifier) => (stmt = this._applyModifier(stmt, modifier))
      );
    }

    return stmt.throwOnError();
  }

  _applyModifier(
    stmt: PostgrestFilterBuilder<Record<string, unknown>>,
    modifier: Modifier
  ): PostgrestFilterBuilder<Record<string, unknown>> {
    switch (modifier.type) {
      case ModifierType.EQ:
        return stmt.eq(modifier.column, modifier.value);
      case ModifierType.NEQ:
        return stmt.neq(modifier.column, modifier.value);
      case ModifierType.LT:
        return stmt.lt(modifier.column, modifier.value);
      case ModifierType.GT:
        return stmt.gt(modifier.column, modifier.value);
      case ModifierType.LTE:
        return stmt.lte(modifier.column, modifier.value);
      case ModifierType.GTE:
        return stmt.gte(modifier.column, modifier.value);
      case ModifierType.LIMIT:
        return stmt.limit(parseInt(modifier.value));
      case ModifierType.SORT:
        return stmt.order(modifier.by, { ascending: modifier.asc });
      case ModifierType.IN:
        return stmt.in(modifier.column, modifier.values);
      case ModifierType.LIKE:
        return stmt.like(modifier.column, modifier.value);
    }
  }
}
