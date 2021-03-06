import { MOCK_DATA, MyConstants, QueryInfo } from '../../utils';
import { useAppSelector } from '../store';

const useQueryState = () => {
  const queries = useAppSelector((state) => state.queries);
  if (MyConstants.isScreenshotting) {
    return MOCK_DATA.queries;
  }

  return queries;
};

export const useQueries = (): QueryInfo[] => Object.values(useQueryState());

export const useQuery = (queryId: string): QueryInfo | undefined =>
  useQueryState()[queryId];
