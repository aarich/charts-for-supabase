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
  async (dispatch) => {
    const supabase = connection.get();

    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const { data, count } = await supabase.query(query);

    validateReturnType(data, count, query.returnInfo);

    dispatch(setQuery(query));

    return query.id;
  };

export const saveConnection =
  (config: ConnectionInfo, password: string): AppThunk =>
  (dispatch) => {
    connection.init(config, password);

    dispatch(setAppSetting({ [AppSetting.SUPABASE_CONFIG]: config }));
    savePassword(password);

    return Promise.resolve();
  };
