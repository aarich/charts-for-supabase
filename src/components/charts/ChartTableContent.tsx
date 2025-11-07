import { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useSafeAreaFrame } from 'react-native-safe-area-context';

import { formatNumber, QueryInfo, QueryType } from '../../utils';
import { Text, View } from '../base';

type Props = {
  queryInfo: QueryInfo;
  queryData: Record<string, unknown>[] | null;
};

const formatValue = (value: unknown): string => {
  if (value == null) {
    return '';
  } else if (typeof value === 'number') {
    return formatNumber(value, 3);
  } else if (typeof value === 'string') {
    // Check if we should format the date
    if (
      /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d*)?Z?(\+\d\d:\d\d)?/.test(value)
    ) {
      const d = new Date(value);
      if (d) {
        return new Intl.DateTimeFormat('en', {
          timeStyle: 'medium',
          dateStyle: 'short',
        }).format(d.getTime());
      }
    }
  }

  return `${value}`;
};

const ChartTableContent = ({ queryData, queryInfo }: Props) => {
  const columns: string[] = useMemo(() => {
    if (queryInfo.type === QueryType.SELECT) {
      const selectCols = queryInfo.select.split(',').map((col) => col.trim());
      if (selectCols.length !== 1 && selectCols[0] !== '*') {
        return selectCols;
      }
    }

    const cols = new Set<string>();
    queryData
      ?.filter((record) => record)
      .forEach((record) => {
        Object.keys(record)?.forEach((key) => cols.add(key));
      });
    return Array.from(cols);
  }, [queryData, queryInfo]);

  const frame = useSafeAreaFrame();
  // random number to say that the table should fill approx half the available space
  const [maxHeight, setMaxHeight] = useState(frame.height * 0.4);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const isPortrait = frame.height > frame.width;
    setMaxHeight(frame.height * (isPortrait ? 0.4 : 0.6));
  }, [frame.height, frame.width]);

  const onScrollContentSizeChange = useCallback(
    (_: number, h: number) => setContentHeight(h),
    []
  );

  return (
    <DataTable>
      <DataTable.Header>
        {columns.map((column) => (
          <DataTable.Title key={column}>
            <Text category="c1">{column}</Text>
          </DataTable.Title>
        ))}
      </DataTable.Header>
      <View style={{ height: Math.min(contentHeight, maxHeight) }}>
        <ScrollView onContentSizeChange={onScrollContentSizeChange}>
          {queryData?.map((item, i) => (
            // @ts-expect-error
            <DataTable.Row key={i}>
              {columns.map((column) => (
                <DataTable.Cell key={column}>
                  <Text category="c1">{formatValue(item[column])}</Text>
                </DataTable.Cell>
              ))}
            </DataTable.Row>
          ))}
        </ScrollView>
      </View>
    </DataTable>
  );
};

export default ChartTableContent;
