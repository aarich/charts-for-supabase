import { FlatList } from 'react-native';
import { DashboardRow } from '../../utils';
import Row from './Row';

type Props = {
  rows: DashboardRow[];
};

const Home = ({ rows }: Props) => {
  return (
    <FlatList
      data={rows}
      renderItem={({ item }) => <Row row={item} />}
      keyExtractor={(_, index) => `${index}`}
    />
  );
};

export default Home;
