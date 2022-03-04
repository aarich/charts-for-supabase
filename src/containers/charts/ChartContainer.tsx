import { useRef } from 'react';
import { AlertButton, Platform, Share, View } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { useExecuteQuery } from '../../api/queries/useExecuteQuery';
import Chart from '../../components/charts/Chart';
import { useQuery } from '../../redux/selectors';
import { alert, DashboardChart } from '../../utils';
import { useStackNavigation } from '../../utils/hooks';

type Props = { chart: DashboardChart };

const ChartContainer = ({ chart }: Props) => {
  const navigation = useStackNavigation();
  const { queryId } = chart;
  const query = useQuery(queryId);
  const { data, loading, refetch, error } = useExecuteQuery(queryId);
  const ref = useRef<View>(null);

  const onGoToQuery = () => navigation.push('QueryEdit', { id: queryId });

  const onShareSnapshot = async () => {
    ref.current?.measure(async (x, y, width, height) => {
      const result = await captureRef(ref, {
        height,
        width,
        quality: 1,
        format: 'png',
      });
      Share.share(
        { url: result, message: query?.name, title: query?.name },
        { dialogTitle: query?.name }
      );
    });
  };

  const onPressError = error
    ? () =>
        alert(
          'Query Error',
          `An error occurred executing the query "${query?.name}"\n\n${error?.message}`,
          [
            { text: 'Edit Query', onPress: onGoToQuery },
            {
              text: 'Edit Dashboard',
              onPress: () => navigation.push('HomeEdit'),
            },
            { text: 'Retry', onPress: () => refetch() },
          ],
          'Ignore'
        )
    : undefined;

  const onPressOptions = () =>
    alert(`${query?.name}`, undefined, [
      { text: 'Reload', onPress: refetch },
      { text: 'Edit Query', onPress: onGoToQuery },
      ...Platform.select<AlertButton[]>({
        web: [],
        default: [{ text: 'Share Snapshot', onPress: onShareSnapshot }],
      }),
    ]);

  return (
    <Chart
      ref={ref}
      chart={chart}
      data={data}
      onPressError={onPressError}
      onPressOptions={onPressOptions}
      loading={loading}
    />
  );
};

export default ChartContainer;
