import { FC } from 'react';
import ActivityIndicator from './ActivityIndicator';
import View from './View';

type Props = {
  loading?: boolean;
  flex?: boolean;
};

const LoadingWrapper: FC<Props> = ({
  loading = false,
  flex = false,
  children,
}) => {
  return loading ? (
    <View flex={flex} center={loading}>
      <View row center>
        <ActivityIndicator />
      </View>
    </View>
  ) : (
    <>{children}</>
  );
};

export default LoadingWrapper;
