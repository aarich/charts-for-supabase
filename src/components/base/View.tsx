import { forwardRef } from 'react';
import { StyleProp, View as RNView, ViewProps, ViewStyle } from 'react-native';

type Props = {
  flex?: boolean | number;
  row?: boolean;
  spread?: boolean;
  center?: boolean;
  right?: boolean;
} & ViewProps;

const View = forwardRef<RNView, Props>(
  ({ children, flex, row, spread, center, right, style, ...props }, ref) => {
    let computedStyle: StyleProp<ViewStyle> = style;
    if (flex) {
      let flexStyle;
      if (typeof flex === 'boolean') {
        flexStyle = { flex: 1 };
      } else {
        flexStyle = { flex };
      }
      computedStyle = [computedStyle, flexStyle];
    }
    if (row) {
      computedStyle = [computedStyle, { flexDirection: 'row' }];
    }
    if (spread) {
      computedStyle = [computedStyle, { justifyContent: 'space-between' }];
    } else if (center) {
      computedStyle = [computedStyle, { justifyContent: 'center' }];
    } else if (right) {
      computedStyle = [computedStyle, { justifyContent: 'flex-end' }];
    }
    return (
      <RNView style={computedStyle} {...props} ref={ref}>
        {children}
      </RNView>
    );
  }
);

export default View;
