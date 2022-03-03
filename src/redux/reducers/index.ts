/* eslint-disable filenames/match-exported */
import { combineReducers } from 'redux';
import dashboard from './DashboardReducer';
import queries from './QueryReducer';
import settings from './SettingsReducer';

const rootReducer = combineReducers({ settings, queries, dashboard });

export default rootReducer;
