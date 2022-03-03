import { Card as UIKCard } from '@ui-kitten/components';
import { ComponentPropsWithoutRef } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

type Props = {
  flex?: boolean;
  padded?: boolean;
} & ComponentPropsWithoutRef<typeof UIKCard>;

export default ({ padded, flex, children, ...props }: Props) => {
  const style = [props.style, flex ? { flex: 1 } : undefined];
  const viewStyle: StyleProp<ViewStyle> = padded
    ? { paddingHorizontal: 16, paddingVertical: 14 }
    : undefined;
  return (
    <UIKCard {...props} style={style}>
      {children ? <View style={viewStyle}>{children}</View> : undefined}
    </UIKCard>
  );
};
