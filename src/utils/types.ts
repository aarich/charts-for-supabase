import {
  DrawerNavigationProp,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
  ParamListBase,
} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Dispatch, SetStateAction } from 'react';
import { AlertButton } from 'react-native';
import { IconType } from './icons';

export type ValueOf<T> = T[keyof T];

export type ScreenInfo<P extends ParamListBase, O> = {
  name: keyof P;
  icon: IconType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  screen?: any;
  onPress?: VoidFunction;
  initialParams?: Partial<P[keyof P]>;
  options?: O;
};

export type DrawerParamList = {
  RootStack: NavigatorScreenParams<RootStackParamList>;
};

export type RootStackParamList = {
  // app
  App: undefined;
  About: undefined;
  Help: undefined;
  Feedback: undefined;

  // content
  Home: undefined;
  HomeEdit: undefined;
  Queries: undefined;
  QueryEdit: { id?: string };
};

export type RootStackScreenInfo = Omit<
  ScreenInfo<RootStackParamList, NativeStackNavigationOptions>,
  'icon'
> & { icon?: IconType };

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<RootStackParamList, Screen>,
    DrawerScreenProps<DrawerParamList>
  >;

export type RootStackNavigationProp<Screen extends keyof RootStackParamList> =
  CompositeNavigationProp<
    NativeStackNavigationProp<RootStackParamList, Screen>,
    DrawerNavigationProp<DrawerParamList>
  >;

export const isValidParam = <T>(
  k: string | number | symbol,
  obj: T
): k is keyof T => {
  return k in obj;
};

export enum AppSetting {
  SUPABASE_CONFIG = 'SUPABASE_CONFIG',
  SUPABASE_SCHEMA = 'SUPABASE_SCHEMA',
  HAS_REQUESTED_REVIEW = 'HAS_REQUESTED_REVIEW',
}

export type MyAlertButton = AlertButton & { icon?: IconType };

export type ConnectionInfo = {
  key: string;
  url: string;
  email: string;
};
export type ConnectionDraft = ConnectionInfo & { password: string };

export enum QueryType {
  SELECT = 'select',
  RPC = 'rpc',
}
export enum QueryReturnType {
  COUNT = 'count',
  LINEAR = 'linear',
}

export type QueryReturnCount = {
  type: QueryReturnType.COUNT;
  count: 'planned' | 'exact' | 'estimated';
};
export type QueryReturnLinear = {
  type: QueryReturnType.LINEAR;
  xColumn: string;
  yColumn: string;
  scale: 'time' | 'linear';
};

export type QueryReturnInfo = QueryReturnCount | QueryReturnLinear;

export enum ModifierType {
  EQ = 'eq',
  NEQ = 'neq',
  LT = 'lt',
  GT = 'gt',
  LTE = 'lte',
  GTE = 'gte',
  LIMIT = 'limit',
  SORT = 'sort',
  IN = 'in',
  LIKE = 'like',
}

type ComparisonModifier = {
  type:
    | ModifierType.EQ
    | ModifierType.NEQ
    | ModifierType.LT
    | ModifierType.GT
    | ModifierType.LTE
    | ModifierType.GTE
    | ModifierType.LIKE;
  column: string;
  value: string;
};
type SingleValueModifier = {
  type: ModifierType.LIMIT;
  value: string;
};
type SortModifier = {
  type: ModifierType.SORT;
  column: string;
  asc: boolean;
};
type InModifier = {
  type: ModifierType.IN;
  column: string;
  values: string[];
};

export type Modifier =
  | ComparisonModifier
  | SingleValueModifier
  | SortModifier
  | InModifier;

export type Modifiers = Modifier[];

interface BaseQueryInfo {
  id: string;
  name: string;
  modifiers?: Modifiers;
  returnInfo: QueryReturnInfo;
}

export type Param = {
  name: string;
  value: string;
};

export interface RPCQueryInfo extends BaseQueryInfo {
  rpc: string;
  params: Param[];
  type: QueryType.RPC;
}

export interface SelectQueryInfo extends BaseQueryInfo {
  select: string;
  table: string;
  type: QueryType.SELECT;
}

export type QueryInfo = SelectQueryInfo | RPCQueryInfo;

export const MAX_HEIGHT = 3;
export const MAX_WIDTH = 3;

export type DashboardChart = {
  queryId: string;
};

export type DashboardRow = {
  charts: DashboardChart[];
};

export type UpdateState<T> = Dispatch<SetStateAction<T>>;
