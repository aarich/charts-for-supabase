import ChartEdit from '../../components/home/ChartEdit';
import { DashboardChart, DashboardRow } from '../../utils';

type Props = {
  row: DashboardRow;
  chartIndex: number;
  onUpdateCharts: (charts: DashboardChart[]) => void;
};

const ChartEditContainer = ({ row, chartIndex, onUpdateCharts }: Props) => {
  const { charts } = row;

  const onRemove = () =>
    onUpdateCharts([
      ...charts.slice(0, chartIndex),
      ...charts.slice(chartIndex + 1),
    ]);

  return <ChartEdit chart={charts[chartIndex]} onRemove={onRemove} />;
};

export default ChartEditContainer;
