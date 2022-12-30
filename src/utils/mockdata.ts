import { PostgrestResponse } from '@supabase/supabase-js';

import { DashboardState } from '../redux/reducers/DashboardReducer';
import { QueryState } from '../redux/reducers/QueryReducer';
import { QueryReturnType, QueryType } from './types';

const countConfig = {
  type: QueryType.SELECT,
  table: 'user',
  select: 'id',
  returnInfo: { type: QueryReturnType.COUNT, count: 'exact' },
};
const chartConfig = {
  type: QueryType.SELECT,
  table: 'post',
  select: 'date, count',
  returnInfo: {
    type: QueryReturnType.LINEAR,
    xColumn: 'date',
    yColumn: 'count',
    scale: 'time',
  },
};
const tableConfig = {
  type: QueryType.SELECT,
  table: 'post',
  select: 'date, avg_page_view',
  returnInfo: {
    type: QueryReturnType.TABLE,
    columns: ['date', 'avg_page_view'],
  },
};

const queryState = {
  usercount: { ...countConfig, id: 'usercount', name: 'Total Users' },
  postcount: {
    ...countConfig,
    id: 'postcount',
    name: 'Total Posts',
    table: 'post',
  },
  posts: { ...chartConfig, id: 'posts', name: 'Posts Created' },
  avgViews: {
    ...tableConfig,
    id: 'avgViews',
    name: 'Average Page Views',
  },
  notifications: {
    ...chartConfig,
    id: 'posts',
    name: 'Notifications Delivered',
    table: 'notification',
  },
};
const dashboardState: DashboardState = {
  rows: [
    { charts: [{ queryId: 'usercount' }, { queryId: 'postcount' }] },
    { charts: [{ queryId: 'posts' }] },
    { charts: [{ queryId: 'avgViews' }] },
    { charts: [{ queryId: 'notifications' }] },
  ],
};

const defaultData = {
  count: 0,
  data: [],
  body: [],
  error: null,
  status: 200,
  statusText: 'success',
};

const MS_IN_DAY = 24 * 60 * 60 * 1000;
const NUM_POINTS = 30;
const start = Date.now() - (NUM_POINTS + 1) * MS_IN_DAY;

const generateData = (
  min: number,
  range: number,
  name = 'count'
): Record<string, number | string>[] => {
  return Array.from(Array(30)).map((v, i) => ({
    date: new Date(start + i * MS_IN_DAY).toISOString(),
    [name]: Math.random() * range + Math.random() * min * i,
  }));
};

const data: Record<
  keyof typeof queryState,
  PostgrestResponse<Record<string, unknown>>
> = {
  usercount: { ...defaultData, count: 46832 },
  postcount: { ...defaultData, count: 103934 },
  posts: { ...defaultData, data: generateData(100, 7000) },
  notifications: { ...defaultData, data: generateData(50, 1000) },
  avgViews: { ...defaultData, data: generateData(5, 30, 'avg_page_view') },
};

export const MOCK_DATA = {
  queries: queryState as QueryState,
  dashboard: dashboardState,
  data: data as Record<string, PostgrestResponse<Record<string, unknown>>>,
};
