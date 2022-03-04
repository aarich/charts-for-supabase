import { PostgrestResponse } from '@supabase/postgrest-js';
import { useCallback, useMemo } from 'react';
import { useQuery } from '../../redux/selectors';
import { MOCK_DATA, MyConstants } from '../../utils';
import connection from '../database';
import { BaseGetterReturn, useBaseGetter } from './useBaseGetter';

export const useExecuteQuery = (
  id: string
): BaseGetterReturn<PostgrestResponse<Record<string, unknown>> | undefined> => {
  const qi = useQuery(id);
  const queryKey = useMemo(() => ['query', id], [id]);
  const queryFn = useCallback(async () => {
    if (MyConstants.isScreenshotting) {
      return MOCK_DATA.data[id];
    }
    return qi ? connection.get()?.query(qi) : undefined;
  }, [id, qi]);

  return useBaseGetter(queryKey, queryFn);
};