import { getPathFromState, LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { DrawerParamList, RootStackParamList } from '../utils';

type Options = LinkingOptions<DrawerParamList>;

const config: Options['config'] = {
  initialRouteName: 'RootStack',
  screens: {
    RootStack: {
      initialRouteName: 'Home',
      screens: {
        Home: '/home',
        Queries: '/queries',
        QueryEdit: '/queries/:id',
        Help: '/help',
        About: '/about',
        Feedback: '/feedback',
        App: '/app',
        HomeEdit: '/edit',
      },
    },
  },
};

const LinkingConfiguration: Options = {
  getPathFromState(state) {
    const innerState = state.routes[0].state;

    if (
      typeof innerState?.index === 'number' &&
      innerState?.routes[innerState.index].name === 'QueryEdit'
    ) {
      const { params } = innerState.routes[innerState.index] as {
        params: RootStackParamList['QueryEdit'];
      };

      if (!params || !('id' in params) || !params.id) {
        return '/queries/new';
      }
    }

    return getPathFromState(state, config);
  },
  prefixes: [Linking.createURL('/')],
  config,
};

export default LinkingConfiguration;
