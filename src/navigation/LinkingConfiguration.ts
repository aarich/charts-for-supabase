import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { RootStackParamList } from '../utils/types';

const LinkingConfiguration: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/'), Linking.createURL('')],
  config: {
    initialRouteName: 'Home',
    screens: {
      Home: '/',
      Help: '/help',
      About: '/about',
      Feedback: '/feedback',
      ResetCache: '/reset',
      App: '/app',
    },
  },
};

export default LinkingConfiguration;
