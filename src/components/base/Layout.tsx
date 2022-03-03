import { Layout as UIKLayout, LayoutProps } from '@ui-kitten/components';
import { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

type Props = {
  flex?: boolean;
  l2?: boolean;
  l3?: boolean;
  l4?: boolean;
} & LayoutProps;

const Layout: FC<Props> = ({
  l2,
  l3,
  l4,
  level: propsLevel,
  children,
  flex,
  style,
  ...props
}) => {
  let computedStyle: StyleProp<ViewStyle> = style;
  if (flex) {
    const flexStyle = { flex: 1 };
    computedStyle = [computedStyle, flexStyle];
  }
  let level = propsLevel ?? '1';
  if (l2) {
    level = '2';
  } else if (l3) {
    level = '3';
  } else if (l4) {
    level = '4';
  }

  return (
    <UIKLayout style={computedStyle} level={level} {...props}>
      {children}
    </UIKLayout>
  );
};

export default Layout;
