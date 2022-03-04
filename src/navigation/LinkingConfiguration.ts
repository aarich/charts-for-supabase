import { getPathFromState, LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { DrawerParamList } from '../utils/types';

type Options = LinkingOptions<DrawerParamList>;

const config: Options['config'] = {
  screens: {
    RootStack: {
      initialRouteName: 'Home',
      screens: {
        Home: '/',
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
      const { params } = innerState.routes[innerState.index];

      // @ts-ignore
      if (!params || !('id' in params) || !params.id) {
        return '/queries/new';
      }
    }

    return getPathFromState(state, config);
  },
  prefixes: [Linking.createURL('/'), Linking.createURL('')],
  config,
};

export default LinkingConfiguration;
