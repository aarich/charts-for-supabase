import { PostgrestResponse } from '@supabase/postgrest-js';
import { Layout, Spinner } from '@ui-kitten/components';
import { forwardRef, ReactElement } from 'react';
import { StyleSheet, View as RNView } from 'react-native';
import { useQuery } from '../../redux/selectors';
import {
  DashboardChart,
  DashboardRow,
  IconsOutlined,
  QueryReturnType,
} from '../../utils';
import { Card, IconButton, Text, View } from '../base';
import ChartCountContent from './ChartCountContent';
import ChartSeriesContent from './ChartSeriesContent';

type Props = {
  row: DashboardRow;
  chart: DashboardChart;
  onPressError?: VoidFunction;
  onPressOptions?: VoidFunction;
  loading: boolean;
  data: PostgrestResponse<Record<string, unknown>> | undefined;
};

const Chart = forwardRef<RNView, Props>(
  ({ row, chart, loading, data, onPressError, onPressOptions }, ref) => {
    const query = useQuery(chart.queryId);

    if (!query) {
      return <Text>Query not found</Text>;
    }

    if (onPressError) {
      return (
        <Card
          onPress={onPressError}
          padded
          footer={<Text category="p2">{query?.name}</Text>}
        >
          <Text status="danger">Query Error</Text>
          <Text category="c1">Tap for details</Text>
        </Card>
      );
    }

    if (loading || !data) {
      return (
        <View row center>
          <View center>
            <Spinner />
          </View>
        </View>
      );
    }

    const renderContent = (): ReactElement => {
      const { returnInfo } = query;
      switch (returnInfo.type) {
        case QueryReturnType.COUNT:
          return <ChartCountContent count={data.count} row={row} />;
        case QueryReturnType.LINEAR:
          return (
            <ChartSeriesContent
              queryData={data.data}
              queryReturnInfo={returnInfo}
              row={row}
            />
          );
      }
    };

    return (
      <Card
        onPress={onPressOptions}
        padded
        style={styles.card}
        footer={
          <View row spread>
            <Text category="s2">{query.name}</Text>
            <IconButton
              status="basic"
              name={IconsOutlined.moreV}
              onPress={onPressOptions}
            />
          </View>
        }
      >
        <View ref={ref}>
          <Layout>{renderContent()}</Layout>
        </View>
      </Card>
    );
  }
);

export default Chart;

const styles = StyleSheet.create({ card: { flexGrow: 1 } });
