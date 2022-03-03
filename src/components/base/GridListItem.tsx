import { Component } from 'react';
import * as React from 'react';
import {
  Image,
  ImageProps,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import View from './View';

export type Props = {
  imageProps?: ImageProps;
  itemSize: ImageSize;
  onPress: () => void;
  renderOverlay?: () => React.ReactElement;
  containerStyle?: StyleProp<ViewStyle>;
};

class GridListItem extends Component<Props> {
  static displayName = 'GridListItem';

  static defaultProps = {
    itemSize: 48,
  };

  state = {};

  onItemPress = () => {
    this.props.onPress();
  };

  render() {
    const { imageProps, children, itemSize, renderOverlay, containerStyle } =
      this.props;
    const imageStyle = itemSize;
    const width = imageStyle.width;
    const imageBorderRadius = imageProps?.borderRadius;

    return (
      <TouchableOpacity
        style={[styles.container, { width }, containerStyle]}
        onPress={this.onItemPress}
      >
        {imageProps && (
          <View style={[{ borderRadius: imageBorderRadius }, imageStyle]}>
            <Image {...imageProps} style={[imageStyle, imageProps?.style]} />
            {children}
          </View>
        )}

        <View style={[styles.overlay, itemSize]}>{renderOverlay?.()}</View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export default GridListItem;

interface ImageSize {
  width?: number;
  height?: number;
}
