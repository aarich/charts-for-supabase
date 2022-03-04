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
  select: 'id',
  returnInfo: {
    type: QueryReturnType.LINEAR,
    xColumn: 'date',
    yColumn: 'count',
    scale: 'time',
  },
};

const queryState = {
  usercount: {
    id: 'usercount',
    name: 'Total Users',
    ...countConfig,
  },
  postcount: {
    id: 'postcount',
    name: 'Total Posts',
    ...countConfig,
  },
  posts: {
    id: 'posts',
    name: 'Posts Created',
    ...chartConfig,
  },
  notifications: {
    id: 'posts',
    name: 'Notifications Delivered',
    ...chartConfig,
  },
};
const dashboardState: DashboardState = {
  rows: [
    { charts: [{ queryId: 'usercount' }, { queryId: 'postcount' }] },
    { charts: [{ queryId: 'posts' }] },
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
  range: number
): { date: string; count: number }[] => {
  return Array.from(Array(30)).map((v, i) => ({
    date: new Date(start + i * MS_IN_DAY).toISOString(),
    count: Math.random() * range + Math.random() * min * i,
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
};

export const MOCK_DATA = {
  queries: queryState as QueryState,
  dashboard: dashboardState,
  data: data as Record<string, PostgrestResponse<Record<string, unknown>>>,
};
