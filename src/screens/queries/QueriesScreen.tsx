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
const QueriesScreen = ({ navigation }: Props) => {
  const connConfig = useSetting(AppSetting.SUPABASE_CONFIG);

  useEffect(() => {
    if (connConfig) {
      navigation.setOptions({
        headerRight: () => (
          <HeaderButton
            icon={IconsOutlined.plus}
            onPress={() => navigation.push('QueryEdit', {})}
          />
        ),
      });
    } else {
      navigation.setOptions({ headerRight: undefined });
    }
  }, [connConfig, navigation]);

  if (!connConfig) {
    return (
      <Layout flex>
        <EmptyState
          title="No Connection"
          description="Before creating queries, establish a database connection"
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

export default QueriesScreen;
