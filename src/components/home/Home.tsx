import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DashboardRow } from '../../utils';
import Row from './Row';

type Props = {
  rows: DashboardRow[];
};

const Home = ({ rows }: Props) => {
  const paddingBottom = useSafeAreaInsets().bottom;

  return (
    <FlatList
      contentContainerStyle={{ paddingBottom }}
      data={rows}
      renderItem={({ item }) => <Row row={item} />}
      keyExtractor={(_, index) => `${index}`}
    />
  );
};

export default Home;
