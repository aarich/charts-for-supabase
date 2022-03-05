import { useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import Queries from '../../components/queries/Queries';
import { saveQuery } from '../../redux/actions';
import { useQueries } from '../../redux/selectors';
import { useAppDispatch } from '../../redux/store';
import { QueryInfo } from '../../utils';

type Props = { onGoToQuery: (id?: string) => void };

const QueriesContainer = ({ onGoToQuery }: Props) => {
  const queries = useQueries();
  const dispatch = useAppDispatch();
  const onDuplicateQuery = useCallback(
    (query: QueryInfo) => {
      const newQuery = { ...query, id: uuid() };
      dispatch(saveQuery(newQuery));
    },
    [dispatch]
  );
  return (
    <Queries
      queries={queries}
      onGoToQuery={onGoToQuery}
      onDuplicateQuery={onDuplicateQuery}
    />
  );
};

export default QueriesContainer;
