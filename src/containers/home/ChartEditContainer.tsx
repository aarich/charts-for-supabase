import ChartEdit from '../../components/home/ChartEdit';
import { DashboardChart, DashboardRow } from '../../utils';

type Props = {
  row: DashboardRow;
  chartIndex: number;
  rowIndex: number;
  onUpdateCharts: (charts: DashboardChart[]) => void;
};

const ChartEditContainer = ({ row, chartIndex, onUpdateCharts }: Props) => {
  const { charts } = row;
  // const dispatch = useAppDispatch();
  // const onUpdate = (chart: DashboardChart) =>
  //   dispatch(setChart({ chart, chartIndex, rowIndex }));

  const onRemove = () =>
    onUpdateCharts([
      ...charts.slice(0, chartIndex),
      ...charts.slice(chartIndex + 1),
    ]);

  // const onMoveChartLeft = (index: number) =>
  //   dispatch(moveChartLeft({ chartIndex: index, rowIndex }));

  // const onMoveLeft =
  //   chartIndex === 0 ? undefined : () => onMoveChartLeft(chartIndex);
  // const onMoveRight =
  //   chartIndex === charts.length - 1
  //     ? undefined
  //     : () => onMoveChartLeft(chartIndex + 1);

  return (
    <ChartEdit
      chart={charts[chartIndex]}
      onRemove={onRemove}
      // onUpdate={onUpdate}
      // onMoveLeft={onMoveLeft}
      // onMoveRight={onMoveRight}
    />
  );
};

export default ChartEditContainer;
