import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
const KEY = `SB_user_password`;

export const getSavedPassword = async (): Promise<string> => {
  if (Platform.OS === 'web') {
    return (await AsyncStorage.getItem(KEY)) || '';
  } else {
    return (await SecureStore.getItemAsync(KEY)) || '';
  }
};

export const savePassword = (password: string) => {
  if (Platform.OS === 'web') {
    // Web does not have a way to store securely. Rely on supabase session.
    // Store a token just to know that it's set
    if (password) {
      AsyncStorage.setItem(KEY, '*');
    } else {
      AsyncStorage.removeItem(KEY);
    }
  } else {
    SecureStore.setItemAsync(KEY, password);
  }
};
