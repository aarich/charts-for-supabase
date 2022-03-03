import { Text as UIKText, TextElement, TextProps } from '@ui-kitten/components';
import { ReactText } from 'react';
import { StyleSheet } from 'react-native';
import { keyed } from '../../../utils';

type Props = {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  s1?: boolean;
  s2?: boolean;
  hint?: boolean;
  center?: boolean;
  italic?: boolean;
  flex?: number;
} & TextProps;

const Text = ({
  h1,
  h2,
  h3,
  s1,
  s2,
  hint,
  center,
  italic,
  children,
  style: passedStyle,
  category: passedCategory,
  appearance: passedAppearance,
  flex,
  ...props
}: Props) => {
  let category: TextProps['category'] = passedCategory || 'p1';
  if (h1) {
    category = 'h1';
  } else if (h2) {
    category = 'h2';
  } else if (h3) {
    category = 'h3';
  } else if (s1) {
    category = 's1';
  } else if (s2) {
    category = 's2';
  }

  let appearance = passedAppearance || 'default';
  if (hint) {
    appearance = 'hint';
  }

  let style = passedStyle || {};
  if (center) {
    style = StyleSheet.flatten([style, { textAlign: 'center' }]);
  }
  if (italic) {
    style = StyleSheet.flatten([style, { fontStyle: 'italic' }]);
  }
  if (flex) {
    style = StyleSheet.flatten([style, { flex }]);
  }

  return (
    <UIKText
      selectable
      {...props}
      category={category}
      appearance={appearance}
      style={style}
    >
      {children}
    </UIKText>
  );
};

export default Text;

const h1Helper = (value: string) => (
  <Text h1 style={styles.h1}>
    {value}
  </Text>
);
const h3Helper = (value: string) => (
  <Text h3 style={styles.h3}>
    {value}
  </Text>
);
const h4Helper = (value: string) => (
  <Text category="h4" style={styles.h4}>
    {value}
  </Text>
);
const h6Helper = (value: string) => (
  <Text category="h6" style={styles.h6}>
    {value}
  </Text>
);
const p = (...args: (ReactText | TextElement)[]) => (
  <Text style={styles.p} selectable>
    {args.every((n) => typeof n === 'string')
      ? Array.prototype.join.call(args, '\n\n')
      : keyed(args)}
  </Text>
);

export { p, h1Helper as h1, h3Helper as h3, h4Helper as h4, h6Helper as h6 };

const styles = StyleSheet.create({
  h1: { padding: 16 },
  h3: { paddingTop: 12, paddingBottom: 8, paddingHorizontal: 16 },
  h4: { paddingTop: 12, paddingBottom: 8, paddingHorizontal: 16 },
  h6: { paddingTop: 8, paddingBottom: 6, paddingHorizontal: 16 },
  p: { paddingHorizontal: 16, fontSize: 15 },
});
