import { Text } from '../base';

type Props = {
  count: number | null;
};

const ChartCountContent = ({ count }: Props) => {
  return <Text h1>{count || 0}</Text>;
};

export default ChartCountContent;
