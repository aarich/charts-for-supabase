import { ComponentPropsWithoutRef } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from './io';

type Props = ComponentPropsWithoutRef<typeof Button>;

const Badge = (props: Props) => {
  return <Button {...props} style={styles.button} size="tiny" />;
};

export default Badge;

const styles = StyleSheet.create({
  button: { marginLeft: 5, borderRadius: 20 },
});
