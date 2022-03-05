import { ComponentPropsWithoutRef } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from './io';

type Props = ComponentPropsWithoutRef<typeof Button>;

const Badge = ({ size = 'tiny', style, ...props }: Props) => {
  return <Button style={[styles.button, style]} size={size} {...props} />;
};

export default Badge;

const styles = StyleSheet.create({
  button: { marginLeft: 5, borderRadius: 20 },
});
