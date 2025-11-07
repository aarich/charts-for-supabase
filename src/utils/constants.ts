// eslint-disable-next-line no-restricted-imports
import Constants from 'expo-constants';
import * as Application from 'expo-application';
import * as Updates from 'expo-updates';

const IS_SCREENSHOTTING = false;

export const MyConstants = {
  isScreenshotting: __DEV__ && IS_SCREENSHOTTING,
  version: `${Application.nativeApplicationVersion} (${Application.nativeBuildVersion}-${Updates.runtimeVersion})`,
  appStoreUrl:
    'https://apps.apple.com/app/apple-store/id1612680145?pt=117925864&ct=ac&mt=8',
  playStoreUrl:
    'https://play.google.com/store/apps/details?id=rich.alex.charts',
  githubUrl: 'https://github.com/aarich/charts-for-supabase',
  ...Constants,
};
