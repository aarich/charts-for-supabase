import { TextProps } from '@ui-kitten/components';
import TimeAgo, { FormatStyleName } from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import moment from 'moment';

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo('en-US');

export const formatTimeAgo = (
  date: Date | string | number,
  format: FormatStyleName = 'twitter-minute-now'
): string =>
  timeAgo.format(
    typeof date === 'object' ? date : moment(date).toDate(),
    format
  ) as string;

export const formatNumber = (num: number, digits = 1) => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[\d]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(({ value }) => num >= value);
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0';
};

export const getUrlDisplay = (urlStr: string) => {
  try {
    return new URL(urlStr).hostname.replace('www.', '');
  } catch {
    return urlStr;
  }
};

export const getIconSize = (category?: TextProps['category']): number =>
  category
    ? // @ts-ignore
      {
        h1: 36,
        h2: 32,
        h3: 30,
        h4: 26,
        h5: 22,
        h6: 18,
        s1: 15,
        s2: 13,
        p1: 15,
        p2: 13,
        c1: 12,
        c2: 12,
        label: 12,
      }[category] || 12
    : 12;
