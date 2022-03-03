import { StyleSheet } from 'react-native';
import { useQuery } from '../../redux/selectors';
import { DashboardChart, Spacings } from '../../utils';
import { Card, Text, View } from '../base';
import ChartEditFooterActions from './ChartEditFooterActions';

type Props = {
  chart: DashboardChart;
  onRemove: VoidFunction;
};

const ChartEdit = ({ chart, onRemove }: Props) => {
  const query = useQuery(chart.queryId);

  return (
    <Card
      disabled
      style={styles.container}
      footer={
        <ChartEditFooterActions onRemove={onRemove} onEdit={() => null} />
      }
    >
      <View row>
        <Text>{query?.name}</Text>
      </View>
    </Card>
  );
};

export default ChartEdit;

const styles = StyleSheet.create({
  container: { margin: Spacings.s1, padding: Spacings.s1 },
});
