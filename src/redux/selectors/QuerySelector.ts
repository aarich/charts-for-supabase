import { QueryInfo } from '../../utils';
import { useAppSelector } from '../store';

export const useQueries = (): QueryInfo[] => {
  const queries = useAppSelector((state) => state.queries);

  return Object.values(queries);
};

export const useQuery = (queryId: string): QueryInfo | undefined =>
  useAppSelector((state) => state.queries)?.[queryId];
