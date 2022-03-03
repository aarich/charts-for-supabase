import { FC } from 'react';
import {
  ImageBackground,
  ImageBackgroundProps,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
} from 'react-native';

type Props = ImageBackgroundProps & {
  overlayColor?: string;
  style: StyleProp<ImageStyle>;
};

const DEFAULT_OVERLAY_COLOR = 'rgba(0, 0, 0, 0)';

const ImageOverlay: FC<Props> = ({
  overlayColor = DEFAULT_OVERLAY_COLOR,
  children,
  ...props
}) => {
  return (
    <ImageBackground {...props} resizeMode="cover">
      <View
        style={[StyleSheet.absoluteFill, { backgroundColor: overlayColor }]}
      />
      {children}
    </ImageBackground>
  );
};

export default ImageOverlay;
