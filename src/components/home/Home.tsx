import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFetching, useQueryClient } from 'react-query';

import { DashboardRow } from '../../utils';
import Row from './Row';

type Props = {
  rows: DashboardRow[];
};

const Home = ({ rows }: Props) => {
  const paddingBottom = useSafeAreaInsets().bottom;

  const queryClient = useQueryClient();
  const isFetching = useIsFetching();

  return (
    <FlatList
      contentContainerStyle={{ paddingBottom }}
      data={rows}
      refreshing={isFetching > 0}
      onRefresh={() => queryClient.refetchQueries()}
      renderItem={({ item }) => <Row row={item} />}
      keyExtractor={(_, index) => `${index}`}
    />
  );
};

export default Home;
