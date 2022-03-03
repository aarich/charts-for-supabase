import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { formatTimeAgo } from '../../utils';
import { Text } from './io';

type Props = {
  time: string | number;
  interval?: number;
  hideAgo?: boolean;
} & ComponentPropsWithoutRef<typeof Text>;

const TimeAgo = ({
  time,
  interval = 60000,
  hideAgo = false,
  ...otherProps
}: Props) => {
  const [displayStr, setDisplayStr] = useState(formatTimeAgo(time));

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayStr(formatTimeAgo(time));
    }, interval);

    return () => clearInterval(timer);
  }, [hideAgo, interval, time]);

  return <Text {...otherProps}>{displayStr}</Text>;
};

export default TimeAgo;
