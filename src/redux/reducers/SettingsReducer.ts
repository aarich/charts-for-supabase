import { OpenAPIV2 } from 'openapi-types';
import { AnyAction } from 'redux';
import { AppSetting, ConnectionInfo } from '../../utils/types';
import { setAppSetting } from '../actions';

export type SettingsState = {
  [AppSetting.HAS_REQUESTED_REVIEW]?: boolean;
  [AppSetting.SUPABASE_CONFIG]?: ConnectionInfo;
  [AppSetting.SUPABASE_SCHEMA]?: OpenAPIV2.Document;
};

const initialState: SettingsState = {};

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
