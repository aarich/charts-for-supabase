import { ComponentPropsWithoutRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState, Layout } from '../../components/base';
import HomeContainer from '../../containers/home/HomeContainer';
import { useDashboard, useQueries, useSetting } from '../../redux/selectors';
import {
  AppSetting,
  IconsOutlined,
  RootStackScreenProps,
  showConnectionSettings,
} from '../../utils';

type Props = RootStackScreenProps<'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const supabaseConfig = useSetting(AppSetting.SUPABASE_CONFIG);
  const queries = useQueries();
  const dashboard = useDashboard();
  const paddingBottom = useSafeAreaInsets().bottom;

  let emptyState: ComponentPropsWithoutRef<typeof EmptyState> | undefined =
    undefined;

  if (!supabaseConfig) {
    emptyState = {
      title: 'Welcome',
      description: 'To get started, connect to your project',
      actions: [
        {
          icon: IconsOutlined.activity,
          onPress: showConnectionSettings,
          label: 'Connect',
        },
      ],
    };
  } else if (!queries.length) {
    emptyState = {
      title: 'No Queries',
      description: "You'll be getting insights in no time.",
      actions: [
        {
          icon: IconsOutlined.plusCircle,
          onPress: () => navigation.push('QueryEdit', {}),
          label: 'Add a query',
        },
      ],
    };
  } else if (!dashboard.rows.length) {
    emptyState = {
      title: 'Home Setup',
      description: 'One last step: Add charts to your dashboard!',
      actions: [
        {
          icon: IconsOutlined.plusCircle,
          onPress: () => navigation.push('HomeEdit'),
          label: 'Add a chart',
        },
      ],
    };
  }

  return (
    <Layout flex style={{ paddingBottom }} l2>
      {emptyState ? <EmptyState {...emptyState} /> : <HomeContainer />}
    </Layout>
  );
};

export default HomeScreen;
