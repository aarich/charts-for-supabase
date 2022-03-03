import { DashboardRow } from '../../utils';
import { Text } from '../base';

type Props = {
  count: number | null;
  row: DashboardRow;
};

const ChartCountContent = ({ count, row }: Props) => {
  const { height } = row;

  const category = ['', 'h2', 'h3', 'h1'][height];
  return <Text category={category}>{count || 0}</Text>;
};

export default ChartCountContent;
