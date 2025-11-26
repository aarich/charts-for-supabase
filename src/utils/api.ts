import {
  Modifier,
  Modifiers,
  ModifierType,
  QueryInfo,
  QueryReturnInfo,
  QueryReturnType,
  QueryType,
  RPCQueryInfo,
  SelectQueryInfo,
} from './types';

export const getOperatorLabel = (op: ModifierType): string =>
  ({
    [ModifierType.EQ]: '=',
    [ModifierType.NEQ]: '≠',
    [ModifierType.LT]: '<',
    [ModifierType.GT]: '>',
    [ModifierType.LTE]: '≤',
    [ModifierType.GTE]: '≥',
    [ModifierType.LIMIT]: 'LIMIT',
    [ModifierType.SORT]: 'SORT',
    [ModifierType.LIKE]: 'LIKE',
    [ModifierType.IN]: 'IN',
  }[op]);

const isSelectQueryValid = (draft: SelectQueryInfo): boolean =>
  !!(draft.table && draft.select);

const isRPCQueryValid = (draft: RPCQueryInfo): boolean =>
  !!(draft.rpc && draft.params.every((param) => param.name && param.value));

const isQueryReturnValid = (draft: QueryReturnInfo): boolean => {
  switch (draft.type) {
    case QueryReturnType.COUNT:
    case QueryReturnType.TABLE:
      return true;
    case QueryReturnType.LINEAR:
      return !!(draft.xColumn && draft.yColumn);
  }
};

const isModifierValid = (modifier: Modifier): boolean => {
  switch (modifier.type) {
    case ModifierType.EQ:
    case ModifierType.NEQ:
    case ModifierType.LT:
    case ModifierType.GT:
    case ModifierType.LTE:
    case ModifierType.GTE:
    case ModifierType.LIKE:
      return !!(modifier.column && modifier.value);
    case ModifierType.LIMIT:
      return !!modifier.value;
    case ModifierType.SORT:
      return !!modifier.column;
    case ModifierType.IN:
      return !!(modifier.column && modifier.values);
  }
};

const areModifiersValid = (modifiers?: Modifiers): boolean =>
  !modifiers || modifiers.every(isModifierValid);

export const isQueryValid = (draft: QueryInfo): boolean => {
  if (!draft.name) {
    return false;
  }

  switch (draft.type) {
    case QueryType.RPC:
      if (!isRPCQueryValid(draft)) {
        return false;
      }
      break;
    case QueryType.SELECT:
      if (!isSelectQueryValid(draft)) {
        return false;
      }
      break;
  }

  if (!isQueryReturnValid(draft.returnInfo)) {
    return false;
  }

  return areModifiersValid(draft.modifiers);
};

export const extractMergeFields = (template: string): string[] => {
  const regex = /{{(.*?)}}/g;
  const matches = template.match(regex);
  const fields = matches ? matches.map((match) => match.slice(2, -2)) : [];
  return [...new Set(fields)];
};

export const getFieldsToSelect = (qi: SelectQueryInfo): string => {
  if (!qi.urlTemplate || qi.select === '*') {
    return qi.select;
  }
  const fieldsInUrl = extractMergeFields(qi.urlTemplate).map((field) =>
    field.trim()
  );
  const fieldsInSelect = qi.select.split(',').map((field) => field.trim());

  const allFields = [...fieldsInUrl, ...fieldsInSelect];
  return [...new Set(allFields)].join(',');
};

export const ensureProtocol = (url: string) =>
  url.startsWith('http://') || url.startsWith('https://')
    ? url
    : `https://${url}`;

export const evaluateTemplate = (
  row: Record<string, unknown>,
  template: string | undefined
): string => {
  if (!template) {
    return '';
  }

  let result = template;
  extractMergeFields(template).forEach((field) => {
    const value = row[field] ?? '';
    result = result.replaceAll(`{{${field}}}`, value.toString());
  });
  return result;
};
