import { StyleSheet } from 'react-native';
import ChartContainer from '../../containers/charts/ChartContainer';
import { DashboardRow, Spacings } from '../../utils';
import { View } from '../base';

type Props = {
  row: DashboardRow;
};

const Row = ({ row }: Props) => {
  const { charts } = row;
  return (
    <View row style={styles.row}>
      {charts.map((chart, i) => (
        <View flex key={i} style={styles.chart}>
          <ChartContainer chart={chart} />
        </View>
      ))}
    </View>
  );
};

export default Row;

const styles = StyleSheet.create({
  chart: { margin: Spacings.s1 },
  row: { marginHorizontal: Spacings.s2, marginTop: Spacings.s2 },
});
