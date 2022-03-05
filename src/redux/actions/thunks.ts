import { Platform } from 'react-native';
import connection from '../../api/database';
import {
  AppSetting,
  ConnectionInfo,
  log,
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

export const saveSchema =
  (config: ConnectionInfo): AppThunk =>
  async (dispatch) => {
    const { url, key } = config;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      throw new Error('Invalid URL');
    }

    const schemaUrl = `${url}/rest/v1/?apikey=${key}`;
    const response = await fetch(schemaUrl);
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('json')) {
      const responseBody = await response.text();
      log('Error connecting to Supabase', { schemaUrl, responseBody });
      throw new Error(
        `Error connecting to Supabase. ${Platform.select({
          web: 'Check console for details.',
          default:
            'Check that the info you provided is correct. What we tried:\n' +
            schemaUrl,
        })}`
      );
    }

    const schema = await response.json();

    if (schema.message) {
      throw new Error(schema.message);
    }

    dispatch(setAppSetting({ [AppSetting.SUPABASE_SCHEMA]: schema }));
    return Promise.resolve();
  };

export const saveConnection =
  (config: ConnectionInfo, password: string): AppThunk =>
  async (dispatch) => {
    await connection.init(config, password);

    await dispatch(saveSchema(config));

    dispatch(setAppSetting({ [AppSetting.SUPABASE_CONFIG]: config }));
    savePassword(password);

    return Promise.resolve();
  };
