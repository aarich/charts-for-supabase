import { useCallback, useMemo } from 'react';
import { FlatList, Platform, Pressable, StyleSheet } from 'react-native';
import ChartEditContainer from '../../containers/home/ChartEditContainer';
import { useQueries } from '../../redux/selectors';
import {
  DashboardRow,
  IconsOutlined,
  prompt,
  QueryReturnType,
  Spacings,
} from '../../utils';
import { Button, Card, IconButton, Layout, PickerOption, View } from '../base';
import RowEditFooterActions from './RowEditFooterActions';

type Props = {
  row: DashboardRow;
  onUpdate: (row: DashboardRow) => void;
  onRemove: VoidFunction;
  onCopy: VoidFunction;
  onMoveUp: VoidFunction | undefined;
  onMoveDown: VoidFunction | undefined;
};

const RowEdit = ({
  row,
  onUpdate,
  onRemove,
  onCopy,
  onMoveDown,
  onMoveUp,
}: Props) => {
  const { charts } = row;

  const queries = useQueries();
  const queryOptions: PickerOption<string>[] = useMemo(
    () =>
      queries.map((q) => ({
        label: q.name,
        value: q.id,
        icon:
          q.returnInfo.type === QueryReturnType.COUNT
            ? IconsOutlined.hash
            : IconsOutlined.grid,
      })),
    [queries]
  );

  const onAddChart = useCallback(() => {
    prompt('', 'Select a query', { options: queryOptions }).then(
      ([queryId, cancelled]) => {
        if (!cancelled && queryId) {
          onUpdate({ ...row, charts: [...row.charts, { queryId }] });
        }
      }
    );
  }, [onUpdate, queryOptions, row]);

  const renderAddChartButton = () => {
    if (charts.length < Platform.select({ web: 4, default: 3 })) {
      return (
        <Pressable onPress={onAddChart} style={styles.addChart}>
          <Layout l4 style={styles.addChart}>
            <View row center>
              <IconButton name={IconsOutlined.plus} onPress={onAddChart} />
            </View>
            <Button label="Add Chart" onPress={onAddChart} ghost size="tiny" />
          </Layout>
        </Pressable>
      );
    }
  };

  return (
    <View>
      <Card
        disabled
        style={styles.container}
        header={
          <RowEditFooterActions
            onRemove={onRemove}
            onMoveDown={onMoveDown}
            onMoveUp={onMoveUp}
            onCopy={onCopy}
          />
        }
      >
        <Layout l2 style={styles.innerLayout}>
          <FlatList
            horizontal
            data={charts}
            keyExtractor={(item, index) => `${item.queryId}-${index}`}
            showsHorizontalScrollIndicator={false}
            renderItem={({ index }) => (
              <ChartEditContainer
                key={index}
                row={row}
                chartIndex={index}
                onUpdateCharts={(c) => onUpdate({ ...row, charts: c })}
              />
            )}
          />
          {renderAddChartButton()}
        </Layout>
      </Card>
    </View>
  );
};

export default RowEdit;

const styles = StyleSheet.create({
  container: { margin: Spacings.s2 },
  innerLayout: { flexDirection: 'row', padding: Spacings.s2 },
  addChart: {
    borderRadius: 10,
    paddingTop: Spacings.s1,
    justifyContent: 'center',
  },
});
