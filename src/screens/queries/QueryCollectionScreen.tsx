import { useEffect } from 'react';
import { EmptyState, HeaderButton, Layout } from '../../components/base';
import QueriesContainer from '../../containers/queries/QueriesContainer';
import { useSetting } from '../../redux/selectors';
import {
  AppSetting,
  IconsOutlined,
  RootStackScreenProps,
  showConnectionSettings,
} from '../../utils';

type Props = RootStackScreenProps<'Queries'>;
const QueryCollectionScreen = ({ navigation }: Props) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          icon={IconsOutlined.plus}
          onPress={() => navigation.push('QueryEdit', {})}
        />
      ),
    });
  });

  const connConfig = useSetting(AppSetting.SUPABASE_CONFIG);
  if (!connConfig) {
    return (
      <Layout flex>
        <EmptyState
          title="No Connection"
          description="Before creating queries, you need to establish a database connection first"
          actions={[
            {
              label: 'Edit Connection',
              onPress: showConnectionSettings,
              icon: IconsOutlined.activity,
            },
          ]}
        />
      </Layout>
    );
  }

  return (
    <QueriesContainer
      onGoToQuery={(id) => navigation.push('QueryEdit', { id })}
    />
  );
};

export default QueryCollectionScreen;
