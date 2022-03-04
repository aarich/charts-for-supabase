import { useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { v4 as uuid } from 'uuid';
import { View } from '../../components/base';
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
  const paddingBottom = useSafeAreaInsets().bottom;

  return (
    <View flex style={{ paddingBottom }}>
      <Queries
        queries={queries}
        onGoToQuery={onGoToQuery}
        onDuplicateQuery={onDuplicateQuery}
      />
    </View>
  );
};

export default QueriesContainer;
