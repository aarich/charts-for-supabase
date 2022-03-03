import { useMemo } from 'react';
import { ScalePropType } from 'victory-core';
import { VictoryChart, VictoryLine } from 'victory-native';
import { DashboardRow, QueryReturnLinear } from '../../utils';
import { useChartTheme } from '../../utils/hooks';

type Props = {
  row: DashboardRow;
  queryData: Record<string, unknown>[] | null;
  queryReturnInfo: QueryReturnLinear;
};

const parseDate = (
  point: Record<string, unknown>,
  xCol: string
): Record<string, unknown> => {
  return { ...point, [xCol]: new Date(point[xCol] as string) };
};

const parseData = (
  queryData: Record<string, unknown>[] | null,
  xCol: string,
  scale: ScalePropType
): Record<string, unknown>[] => {
  if (!queryData) {
    return [];
  } else if (scale === 'time') {
    return queryData.map((p) => parseDate(p, xCol));
  }
  return queryData;
};

const ChartSeriesContent = ({ queryData, queryReturnInfo }: Props) => {
  const { scale, xColumn, yColumn } = queryReturnInfo;
  const data = useMemo(
    () => parseData(queryData, xColumn, scale),
    [queryData, scale, xColumn]
  );

  const chartTheme = useChartTheme();

  return (
    <VictoryChart
      style={{ background: { background: 'green' } }}
      theme={chartTheme}
    >
      <VictoryLine
        scale={{ x: scale, y: 'linear' }}
        data={data}
        x={xColumn}
        y={yColumn}
        labels={({ datum }) => datum[yColumn]}
        sortKey={scale === 'time' ? xColumn : undefined}
        theme={chartTheme}
      />
    </VictoryChart>
  );
};

export default ChartSeriesContent;
