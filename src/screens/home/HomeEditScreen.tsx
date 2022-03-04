import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState, Layout } from '../../components/base';
import HomeEditContainer from '../../containers/home/HomeEditContainer';
import { useQueries } from '../../redux/selectors';
import { IconsOutlined, RootStackScreenProps } from '../../utils';

type Props = RootStackScreenProps<'Home'>;

const HomeEditScreen = ({ navigation }: Props) => {
  const queries = useQueries();
  const paddingBottom = useSafeAreaInsets().bottom;

  if (!queries.length) {
    return (
      <Layout flex style={{ paddingBottom }} l2>
        <EmptyState
          title="No Queries"
          description="Before you can set up your dashboard, create a query."
          actions={[
            {
              icon: IconsOutlined.plusCircle,
              onPress: () => navigation.push('QueryEdit', {}),
              label: 'Add a query',
            },
          ]}
        />
      </Layout>
    );
  }

  return <HomeEditContainer />;
};

export default HomeEditScreen;
