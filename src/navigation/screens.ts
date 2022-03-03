import { screened } from '../components/base/Screen';
import ResetCacheScreen from '../containers/about/ResetCacheScreen';
import AboutScreen from '../screens/about/AboutScreen';
import AppScreen from '../screens/about/AppScreen';
import FeedbackScreen from '../screens/about/FeedbackScreen';
import HelpScreen from '../screens/about/HelpScreen';
import TwitterTimelineScreen from '../screens/about/TwitterTimelineScreen';
import SettingsScreen from '../screens/app/SettingsScreen';
import HomeEditScreen from '../screens/home/HomeEditScreen';
import HomeScreen from '../screens/home/HomeScreen';
import QueryCollectionScreen from '../screens/queries/QueryCollectionScreen';
import QueryEditScreen from '../screens/queries/QueryEditScreen';
import { MyConstants, RootStackScreenInfo } from '../utils';

const asScreens = <S extends RootStackScreenInfo>(screens: S[]): S[] =>
  screens.map(
    ({ screen, ...props }) => ({ screen: screened(screen), ...props } as S)
  );

const screens = asScreens<RootStackScreenInfo>([
  { name: 'Home', screen: HomeScreen },
  { name: 'HomeEdit', screen: HomeEditScreen, options: { title: 'Edit Home' } },

  // Content
  { name: 'Queries', screen: QueryCollectionScreen },
  { name: 'QueryEdit', screen: QueryEditScreen },

  // Settings
  { name: 'Settings', screen: SettingsScreen },

  // Info
  { name: 'About', screen: AboutScreen },
  { name: 'Help', screen: HelpScreen },
  { name: 'Twitter', screen: TwitterTimelineScreen },
  { name: 'Feedback', screen: FeedbackScreen },
  {
    name: 'ResetCache',
    screen: ResetCacheScreen,
    options: { title: 'Reset Cache' },
  },
  {
    name: 'App',
    screen: AppScreen,
    options: { title: MyConstants.manifest?.name, headerShown: false },
  },
]);

export default screens;
