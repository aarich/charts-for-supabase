import { StyleSheet } from 'react-native';
import { useQuery } from '../../redux/selectors';
import { DashboardChart, Spacings } from '../../utils';
import { Card, Text, View } from '../base';
import ChartEditActions from './ChartEditActions';

type Props = {
  chart: DashboardChart;
  onRemove: VoidFunction;
};

const ChartEdit = ({ chart, onRemove }: Props) => {
  const query = useQuery(chart.queryId);

  return (
    <Card disabled padded style={styles.container}>
      <View row>
        <View center>
          <Text>{query?.name}</Text>
        </View>
        <ChartEditActions onRemove={onRemove} />
      </View>
    </Card>
  );
};

export default ChartEdit;

const styles = StyleSheet.create({
  container: { margin: Spacings.s1, padding: Spacings.s1 },
});
