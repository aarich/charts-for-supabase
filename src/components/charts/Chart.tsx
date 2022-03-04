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
  onPressError?: VoidFunction;
  onPressOptions?: VoidFunction;
  loading: boolean;
  data: PostgrestResponse<Record<string, unknown>> | undefined;
};

const Chart = forwardRef<RNView, Props>(
  ({ chart, loading, data, onPressError, onPressOptions }, ref) => {
    const query = useQuery(chart.queryId);
    const [layout, setLayout] = useState<LayoutRectangle>();
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
        footer={
          <View row spread>
            <Text category="s1">{query.name}</Text>
            <IconButton
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

const styles = StyleSheet.create({ card: { paddingHorizontal: Spacings.s2 } });
