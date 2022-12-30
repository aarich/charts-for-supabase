import { OpenAPIV2 } from 'openapi-types';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostgrestBuilder, PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import {
    formatParam, formatParams, handleError, log, Modifier, ModifierType, QueryInfo, QueryReturnType,
    QueryType
} from '../../utils';

export const DEFAULT_TABLE_LIMIT = 20;

export class SupabaseConnection {
  supabase: SupabaseClient;

  constructor(url: string, key: string) {
    this.supabase = createClient(url, key, {
      localStorage: AsyncStorage,
      shouldThrowOnError: true,
    });
  }

  destroy() {
    this.supabase.auth.session() && this.supabase.auth.signOut();
  }

  async signIn(email: string, password: string) {
    if (
      !password ||
      this.supabase.auth.user()?.email?.toLowerCase() === email.toLowerCase()
    ) {
      // already signed in or password not set
      return;
    }
    log('Signing in to supabase.', { email });
    const { error } = await this.supabase.auth.signIn({ email, password });
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

  get user() {
    return this.supabase.auth.user();
  }

  query(
    qi: QueryInfo,
    schema: OpenAPIV2.Document | undefined
  ): PostgrestBuilder<Record<string, unknown>> {
    let stmt: PostgrestFilterBuilder<Record<string, unknown>>;
    let columnInfos: Record<string, OpenAPIV2.SchemaObject> | undefined;
    if (qi.type === QueryType.RPC) {
      const params = formatParams(qi.rpc, qi.params, schema);
      stmt = this.supabase.rpc(qi.rpc, params);
    } else {
      const options =
        qi.returnInfo.type === QueryReturnType.COUNT
          ? { count: qi.returnInfo.count, head: true }
          : undefined;
      stmt = this.supabase.from(qi.table).select(qi.select, options);
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

    return stmt;
  }

  _applyModifier(
    stmt: PostgrestFilterBuilder<Record<string, unknown>>,
    modifier: Modifier,
    columnInfos: Record<string, OpenAPIV2.SchemaObject> | undefined
  ): PostgrestFilterBuilder<Record<string, unknown>> {
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
