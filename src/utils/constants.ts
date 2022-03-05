// eslint-disable-next-line no-restricted-imports
import Constants from 'expo-constants';

const myVersion = '7';

const IS_SCREENSHOTTING = false;

export const MyConstants = {
  isScreenshotting: __DEV__ && IS_SCREENSHOTTING,
  version: `${Constants.manifest?.version} (${myVersion})`,
  appStoreUrl:
    'https://apps.apple.com/app/apple-store/id1612680145?pt=117925864&ct=ac&mt=8',
  playStoreUrl:
    'https://play.google.com/store/apps/details?id=rich.alex.charts',
  githubUrl: 'https://github.com/aarich/charts-for-supabase',
  ...Constants,
};
