import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { log } from './log';
const KEY = `SB_user_password`;

export const getSavedPassword = async (): Promise<string> => {
  if (Platform.OS === 'web') {
    return (await AsyncStorage.getItem(KEY)) || '';
  }
  const password = await SecureStore.getItemAsync(KEY);

  if (!password) {
    log(`Didn't find saved password`);
    return '';
  }

  return password;
};

export const savePassword = (password: string) => {
  if (Platform.OS === 'web') {
    // Web does not have a way to store securely. Rely on supabase session.
    // Store a token here just to
    if (password) {
      AsyncStorage.setItem(KEY, '###');
    } else {
      AsyncStorage.removeItem(KEY);
    }
  } else {
    SecureStore.setItemAsync(KEY, password);
  }
};
