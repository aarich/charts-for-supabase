import { StyleSheet } from 'react-native';
import { formatNumber, Spacings } from '../../utils';
import { Text } from '../base';

type Props = {
  count: number | null;
};

const ChartCountContent = ({ count }: Props) => {
  return (
    <Text h1 style={styles.value}>
      {formatNumber(count || 0)}
    </Text>
  );
};

export default ChartCountContent;

const styles = StyleSheet.create({ value: { padding: Spacings.s4 } });
