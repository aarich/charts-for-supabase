import { PostgrestResponse } from '@supabase/postgrest-js';
import { Layout, Spinner } from '@ui-kitten/components';
import { forwardRef, ReactElement, useState } from 'react';
import { LayoutRectangle, StyleSheet, View as RNView } from 'react-native';
import { useQuery } from '../../redux/selectors';
import {
  DashboardChart,
  IconsOutlined,
  QueryReturnType,
  Spacings,
} from '../../utils';
import { Card, IconButton, Text, View } from '../base';
import ChartCountContent from './ChartCountContent';
import ChartSeriesContent from './ChartSeriesContent';

type Props = {
  chart: DashboardChart;
  loading: boolean;
  data: PostgrestResponse<Record<string, unknown>> | undefined;
  onPressError?: VoidFunction;
  onPressOptions: VoidFunction;
};

const Chart = forwardRef<RNView, Props>(
  ({ chart, loading, data, onPressError, onPressOptions }, ref) => {
    const query = useQuery(chart.queryId);
    const [layout, setLayout] = useState<LayoutRectangle>();

    if (onPressError || !query) {
      return (
        <Card
          onPress={onPressError}
          padded
          footer={query && <Text>{query?.name ?? chart.queryId}</Text>}
        >
          <Text status="danger">
            {query ? 'Query Error' : 'Query Not Found'}
          </Text>
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
          return <ChartCountContent count={data.count} />;
        case QueryReturnType.LINEAR:
          return (
            <ChartSeriesContent
              queryData={data.data}
              queryReturnInfo={returnInfo}
              width={layout?.width}
              height={layout?.height}
            />
          );
      }
    };

    return (
      <Card
        onPress={onPressOptions}
        style={styles.card}
        header={
          <View row spread>
            <Text category="s1" style={styles.header}>
              {query.name}
            </Text>
            <IconButton
              style={styles.header}
              status="basic"
              name={IconsOutlined.moreV}
              onPress={onPressOptions}
            />
          </View>
        }
      >
        <View
          ref={ref}
          onLayout={({ nativeEvent }) =>
            // just measure once
            !layout && setLayout(nativeEvent.layout)
          }
        >
          <Layout>{renderContent()}</Layout>
        </View>
      </Card>
    );
  }
);

export default Chart;

const styles = StyleSheet.create({
  card: { paddingHorizontal: Spacings.s2 },
  header: { margin: Spacings.s2 },
});
