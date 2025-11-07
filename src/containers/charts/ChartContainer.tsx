import { AlertButton } from 'react-native';
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

  const onGoToQuery = () => navigation.push('QueryEdit', { id: queryId });

  const onPressError =
    error || !query
      ? () => {
          const title = query ? 'Query Error' : 'Query Not Found';
          const message = query
            ? `An error occurred executing the query "${query?.name}"\n\n${error?.message}`
            : 'Did you delete this query?';
          const options: AlertButton[] = [
            {
              text: 'Edit Dashboard',
              onPress: () => navigation.push('HomeEdit'),
            },
          ];

          if (query) {
            options.push(
              { text: 'Edit Query', onPress: onGoToQuery },
              { text: 'Retry', onPress: () => refetch() }
            );
          }
          alert(title, message, options, 'Ignore');
        }
      : undefined;

  const onPressOptions = () =>
    alert(`${query?.name}`, undefined, [
      { text: 'Reload', onPress: refetch },
      { text: 'Edit Query', onPress: onGoToQuery },
    ]);

  return (
    <Chart
      chart={chart}
      data={data}
      onPressError={onPressError}
      onPressOptions={onPressOptions}
      loading={loading}
    />
  );
};

export default ChartContainer;
