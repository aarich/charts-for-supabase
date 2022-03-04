import { useMemo } from 'react';
import { ScalePropType } from 'victory-core';
import { VictoryAxis, VictoryChart, VictoryLine } from 'victory-native';
import { QueryReturnLinear } from '../../utils';
import { useChartTheme } from '../../utils/hooks';

type Props = {
  queryData: Record<string, unknown>[] | null;
  queryReturnInfo: QueryReturnLinear;
  width: number | undefined;
  height: number | undefined;
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

const ChartSeriesContent = ({
  queryData,
  queryReturnInfo,
  width,
  height,
}: Props) => {
  const { scale, xColumn, yColumn } = queryReturnInfo;
  const data = useMemo(
    () => parseData(queryData, xColumn, scale),
    [queryData, scale, xColumn]
  );

  const chartTheme = useChartTheme();

  return (
    <VictoryChart
      theme={chartTheme}
      width={width}
      height={height}
      scale={{ x: scale, y: 'linear' }}
    >
      <VictoryLine
        data={data}
        x={xColumn}
        y={yColumn}
        sortKey={scale === 'time' ? xColumn : undefined}
      />
      <VictoryAxis label={yColumn} dependentAxis />
      <VictoryAxis label={xColumn} />
    </VictoryChart>
  );
};

export default ChartSeriesContent;
