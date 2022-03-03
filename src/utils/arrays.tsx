import { Fragment, ReactNode } from 'react';

export const keyed = (arr: ReactNode[]) =>
  arr.map((e, i) => <Fragment key={i}>{e}</Fragment>);

export const pickRandom = <T,>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];
