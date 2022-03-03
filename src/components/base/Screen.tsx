import { FC } from 'react';
import { Platform, useWindowDimensions, View } from 'react-native';
import { useBackgroundColor } from '../../utils/hooks';

export const MAX_WEB_WIDTH = 1000;

const Screen: FC = ({ children }) => {
  const screenWidth = useWindowDimensions().width;
  const backgroundColor = useBackgroundColor(2);
  const style = [
    Platform.select({
      web: {
        backgroundColor,
        paddingHorizontal: Math.max(0, (screenWidth - MAX_WEB_WIDTH) / 2),
      },
    }),
    { flex: 1 },
  ];

  return <View style={style}>{children}</View>;
};

export default Screen;

export const screened =
  <P extends Record<string, unknown>>(Component: FC<P>) =>
  (props: P) =>
    (
      <Screen>
        <Component {...props} />
      </Screen>
    );
