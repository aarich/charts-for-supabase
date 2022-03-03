import * as SecureStore from 'expo-secure-store';
import { log } from './log';

const KEY = `SB_user_password`;

export const getSavedPassword = async (
  requireAuthentication: boolean
): Promise<string> => {
  const password = await SecureStore.getItemAsync(KEY, {
    requireAuthentication,
  });

  if (!password) {
    log(`Didn't find saved password`);
    return '';
  }

  return password;
};

export const savePassword = (password: string) =>
  SecureStore.setItemAsync(KEY, password);
