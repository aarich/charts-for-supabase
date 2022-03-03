import { AnyAction } from 'redux';
import { AppSetting, ConnectionInfo } from '../../utils/types';
import { setAppSetting } from '../actions';

export type SettingsState = {
  [AppSetting.REQUIRE_LOCAL_AUTH]: boolean;
  [AppSetting.HAS_REQUESTED_REVIEW]: boolean;
  [AppSetting.SUPABASE_CONFIG]?: ConnectionInfo;
};

const initialState: SettingsState = {
  [AppSetting.REQUIRE_LOCAL_AUTH]: false,
  [AppSetting.HAS_REQUESTED_REVIEW]: false,
};

const SettingsReducer = (
  state = initialState,
  action: AnyAction
): SettingsState => {
  if (setAppSetting.match(action)) {
    return { ...state, ...action.payload };
  }
  return state;
};

export default SettingsReducer;
