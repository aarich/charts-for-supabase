import { AppSetting } from '../../utils';
import { SettingsState } from '../reducers/SettingsReducer';
import { useAppSelector } from '../store';

export const useSetting = <T extends AppSetting>(
  setting: T
): SettingsState[T] => useAppSelector((state) => state.settings)[setting];
