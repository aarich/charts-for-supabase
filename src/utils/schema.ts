import { OpenAPIV2 } from 'openapi-types';
import { Param } from './types';
const RPC_PREFIX = '/rpc/';

export const getRPCNames = (
  schema: OpenAPIV2.Document | undefined
): string[] | undefined =>
  schema
    ? Object.keys(schema?.paths)
        .filter((path) => path.startsWith(RPC_PREFIX))
        .map((path) => path.substring(RPC_PREFIX.length))
        .sort()
    : undefined;

export const getTableAndViewNames = (
  schema: OpenAPIV2.Document | undefined
): string[] | undefined =>
  schema?.definitions ? Object.keys(schema.definitions).sort() : undefined;

export const getColumns = (
  table: string | undefined,
  definitions: OpenAPIV2.DefinitionsObject | undefined
): string[] | undefined => {
  if (!table || !definitions?.[table]) {
    return undefined;
  }

  const { properties } = definitions[table];
  return properties ? Object.keys(properties) : undefined;
};

export const getColumnInfo = (
  table: string | undefined,
  column: string | undefined,
  schema: OpenAPIV2.Document | undefined
): OpenAPIV2.SchemaObject | undefined => {
  const { definitions } = schema || {};
  if (!table || !column || !definitions?.[table]) {
    return undefined;
  }

  return definitions[table].properties?.[column];
};

export const getRPCParamInfo = (
  rpc: string,
  paths: OpenAPIV2.PathsObject | undefined
): { [name: string]: OpenAPIV2.SchemaObject } | undefined => {
  const path = paths?.[RPC_PREFIX + rpc];

  const param0 = path?.post?.parameters?.[0];

  if (param0 && 'schema' in param0 && param0.name === 'args') {
    return param0.schema.properties;
  }
};

export const formatParam = (
  info: OpenAPIV2.SchemaObject | undefined,
  value: string
): unknown => {
  if (info) {
    if (isBoolean(info)) {
      return value === 'true';
    } else if (isInt(info)) {
      return parseInt(value);
    } else if (isFloat(info)) {
      return parseFloat(value);
    } else if (isDate(info)) {
      return new Date(parseInt(value)).toISOString();
    }
  }
  return value;
};

export const formatParams = (
  rpc: string,
  params: Param[] | undefined,
  schema: OpenAPIV2.Document | undefined
): object | undefined => {
  const paramInfos = getRPCParamInfo(rpc, schema?.paths);
  if (!paramInfos) {
    return;
  }

  const formattedParams: Record<string, unknown> = {};
  params?.forEach(({ name, value }) => {
    formattedParams[name] = formatParam(paramInfos[name], value);
  });

  return formattedParams;
};

export const isDate = ({ format }: OpenAPIV2.SchemaObject): boolean =>
  typeof format === 'string' &&
  (format.includes('date') || format.includes('time'));

export const isBoolean = ({ type }: OpenAPIV2.SchemaObject): boolean =>
  type === 'boolean';

const isInt = ({ type }: OpenAPIV2.SchemaObject): boolean =>
  typeof type === 'string' && ['integer', 'long'].includes(type);

const isFloat = ({ type }: OpenAPIV2.SchemaObject): boolean =>
  typeof type === 'string' && ['integer', 'long'].includes(type);

export const isNumeric = (schemaObj: OpenAPIV2.SchemaObject): boolean =>
  isInt(schemaObj) || isFloat(schemaObj);
