import { createAction } from '@reduxjs/toolkit';
import { DashboardChart, DashboardRow, QueryInfo } from '../../utils';
import { SettingsState } from '../reducers/SettingsReducer';

// App
export const reset = createAction('App/RESET');
export const setAppSetting =
  createAction<Partial<SettingsState>>('App/SET_SETTING');

// Query
export const setQuery = createAction<QueryInfo>('Query/SET');
export const deleteQuery = createAction<QueryInfo>('Query/DELETE');

// Dashboard
export const setRow =
  createAction<[DashboardRow, number?]>('Dashboard/SET_ROW');
export const deleteRow = createAction<number>('Dashboard/DELETE_ROW');
export const moveRowUp = createAction<number>('Dashboard/MOVE_ROW_UP');
export const setChart = createAction<{
  chart: DashboardChart;
  chartIndex: number;
  rowIndex: number;
}>('Dashboard/SET_CHART');
export const moveChartLeft = createAction<{
  chartIndex: number;
  rowIndex: number;
}>('Dashboard/MOVE_CHART_LEFT');
