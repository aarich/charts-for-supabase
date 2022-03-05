import connection from '../../api/database';
import {
  AppSetting,
  ConnectionInfo,
  QueryInfo,
  QueryReturnInfo,
  QueryReturnType,
  savePassword,
} from '../../utils';
import { AppThunk } from '../store';
import { setAppSetting, setQuery } from './actions';

const validateColumnInEveryRow = (
  data: Record<string, unknown>[] | null,
  column: string
) => {
  if (!data?.every((row) => column in row)) {
    throw new Error(`Didn't find ${column} in all result rows.`);
  }
};

const validateReturnType = (
  data: Record<string, unknown>[] | null,
  count: number | null,
  returns: QueryReturnInfo
): void => {
  if (data === null && count === null) {
    throw new Error('No data received');
  }

  switch (returns.type) {
    case QueryReturnType.COUNT:
      if (typeof count !== 'number') {
        throw new Error("Didn't get count!");
      }
      return;
    case QueryReturnType.LINEAR:
      validateColumnInEveryRow(data, returns.xColumn);
      validateColumnInEveryRow(data, returns.yColumn);
      break;
  }
};

export const saveQuery =
  (query: QueryInfo): AppThunk<string> =>
  async (dispatch, getState) => {
    const supabase = connection.get();
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const schema = getState().settings[AppSetting.SUPABASE_SCHEMA];
    const { data, count } = await supabase.query(query, schema);

    validateReturnType(data, count, query.returnInfo);

    dispatch(setQuery(query));

    return query.id;
  };

export const saveConnection =
  (config: ConnectionInfo, password: string): AppThunk =>
  async (dispatch) => {
    connection.init(config, password);

    const response = await fetch(`${config.url}/rest/v1/?apikey=${config.key}`);
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('json')) {
      const text = await response.text();
      throw new Error(text);
    }
    const schema = await response.json();

    if (schema.message) {
      throw new Error(schema.message);
    }

    dispatch(setAppSetting({ [AppSetting.SUPABASE_SCHEMA]: schema }));
    dispatch(setAppSetting({ [AppSetting.SUPABASE_CONFIG]: config }));
    savePassword(password);

    return Promise.resolve();
  };
