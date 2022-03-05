import { OpenAPIV2 } from 'openapi-types';
import { useSetting } from '../../redux/selectors';
import {
  getColumns,
  getRPCNames,
  getRPCParamInfo,
  getTableAndViewNames,
} from '../openapi';
import { AppSetting } from '../types';

export const useSchema = () => useSetting(AppSetting.SUPABASE_SCHEMA);

export const useRPCNames = (): string[] | undefined => getRPCNames(useSchema());

export const useTableNames = (): string[] | undefined =>
  getTableAndViewNames(useSchema());

export const useColumns = (table: string | undefined): string[] | undefined =>
  getColumns(table, useSchema()?.definitions);

export const useRPCParams = (
  rpc: string
): { [name: string]: OpenAPIV2.SchemaObject } | undefined =>
  getRPCParamInfo(rpc, useSchema()?.paths);

export const useRPCParamInfo = (rpc: string, paramName: string) =>
  useRPCParams(rpc)?.[paramName];
