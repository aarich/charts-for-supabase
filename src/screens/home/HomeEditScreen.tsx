import { EmptyState } from '../../components/base';
import HomeEditContainer from '../../containers/home/HomeEditContainer';
import { useQueries } from '../../redux/selectors';
import { IconsOutlined, RootStackScreenProps } from '../../utils';

type Props = RootStackScreenProps<'Home'>;

const HomeEditScreen = ({ navigation }: Props) => {
  const queries = useQueries();

  if (!queries.length) {
    return (
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
    );
  }

  return <HomeEditContainer />;
};

export default HomeEditScreen;
