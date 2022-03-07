import { PostgrestResponse } from '@supabase/postgrest-js';
import { useCallback, useEffect, useMemo } from 'react';
import { useQueryClient } from 'react-query';
import { useQuery } from '../../redux/selectors';
import { MOCK_DATA, MyConstants } from '../../utils';
import { useSchema } from '../../utils/hooks';
import connection from '../database';
import { BaseGetterReturn, useBaseGetter } from './useBaseGetter';

export const makeQueryKey = (id: string) => ['query', id];

export const useExecuteQuery = (
  id: string
): BaseGetterReturn<PostgrestResponse<Record<string, unknown>> | undefined> => {
  const queryClient = useQueryClient();
  const schema = useSchema();
  const qi = useQuery(id);
  const queryKey = useMemo(() => makeQueryKey(id), [id]);
  const queryFn = useCallback(async () => {
    if (MyConstants.isScreenshotting) {
      return MOCK_DATA.data[id];
    }
    return qi ? connection.get()?.query(qi, schema) : undefined;
  }, [id, qi, schema]);

  useEffect(
    () => queryClient.removeQueries(queryKey),
    [qi, queryClient, queryKey]
  );

  return useBaseGetter(queryKey, queryFn);
};
