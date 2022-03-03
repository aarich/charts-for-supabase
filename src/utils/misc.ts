import { UpdateState, ValueOf } from './types';

export const update =
  <T extends Record<string, unknown>>(key: keyof T, onUpdate: UpdateState<T>) =>
  (value: ValueOf<T>) =>
    onUpdate((old) => ({ ...old, [key]: value }));
