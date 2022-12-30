import { parse, useURL } from 'expo-linking';
import { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLinkTo } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList, showConnectionSettings } from '../utils';
import screens from './screens';
import TopNavigation from './TopNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  const topInsets = useSafeAreaInsets().top;

  const appUrl = useURL();
  const linkTo = useLinkTo();
  useEffect(() => {
    if (!appUrl) {
      return;
    }

    const { queryParams, path } = parse(appUrl);
    if (path === 'init') {
      const { key, url, email } = queryParams || {};

      if (!key && !url && !email) {
        return;
      }

      // We have received config from the url
      showConnectionSettings({
        key: key as string | undefined,
        url: url as string | undefined,
        email: email as string | undefined,
      });
    } else if (path) {
      linkTo('/' + path);
    }
  }, [appUrl, linkTo]);

  return (
    <Stack.Navigator
      screenOptions={{
        header: TopNavigation(topInsets),
      }}
    >
      {screens.map(({ name, screen, options }) => (
        <Stack.Screen
          key={name}
          name={name}
          component={screen}
          options={options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
