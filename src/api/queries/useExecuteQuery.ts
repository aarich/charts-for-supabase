import { PostgrestResponse } from '@supabase/postgrest-js';
import { useCallback, useMemo } from 'react';
import { useQuery } from '../../redux/selectors';
import connection from '../database';
import { BaseGetterReturn, useBaseGetter } from './useBaseGetter';

export const useExecuteQuery = (
  id: string
): BaseGetterReturn<PostgrestResponse<Record<string, unknown>> | undefined> => {
  const qi = useQuery(id);
  const queryKey = useMemo(() => ['query', id], [id]);
  const queryFn = useCallback(
    async () => (qi ? connection.get()?.query(qi) : undefined),
    [qi]
  );

  return useBaseGetter(queryKey, queryFn);
};
