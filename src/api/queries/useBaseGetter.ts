import { QueryFunction, QueryKey, useQuery } from 'react-query';

export type BaseGetterReturn<T> = {
  data: T | undefined;
  loading: boolean;
  refetch: VoidFunction;
  error: Error | null;
};

export const useBaseGetter = <T>(
  queryKey: QueryKey,
  queryFn: QueryFunction<T>,
  cacheTime?: number
): BaseGetterReturn<T> => {
  const { data, error, refetch, isLoading } = useQuery<T, Error>({
    queryKey,
    queryFn,
    cacheTime,
  });

  return { data, refetch, error, loading: isLoading };
};
