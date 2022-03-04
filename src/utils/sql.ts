import { ModifierType } from './types';

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
