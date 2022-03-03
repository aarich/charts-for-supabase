import { ModifierType } from './types';

export const toSqlString = (date: Date) =>
  date.toISOString().slice(0, 19).replace('T', ' ');

export const parseSqlDateString = (dateString: string) =>
  new Date(dateString.replace(' ', 'T') + 'Z');

export const dateToDisplay = (dateString?: string) =>
  dateString
    ? parseSqlDateString(dateString).toLocaleDateString()
    : '' + dateString;

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
