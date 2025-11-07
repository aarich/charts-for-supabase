import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import DrawerContentContainer from '../containers/app/DrawerContentContainer';
import { DrawerParamList } from '../utils';
import { useBackgroundColor, useIsDark } from '../utils/hooks';
import LinkingConfiguration from './LinkingConfiguration';
import RootStackNavigator from './RootStackNavigator';

const Drawer = createDrawerNavigator<DrawerParamList>();

export default () => {
  const isDark = useIsDark();
  const backgroundColor = useBackgroundColor();

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={isDark ? DarkTheme : DefaultTheme}
    >
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContentContainer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: { backgroundColor },
        }}
      >
        <Drawer.Screen name="RootStack" component={RootStackNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
