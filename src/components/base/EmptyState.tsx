import { StyleSheet } from 'react-native';
import { IconType } from '../../utils';
import { Button, Text } from './io';
import View from './View';

type Props = {
  title: string;
  description?: string;
  actions?: { icon?: IconType; onPress: () => void; label: string }[];
};

const EmptyState = ({ title, description, actions }: Props) => {
  return (
    <View center style={styles.container}>
      <Text h1 center>
        {title}
      </Text>
      <Text center style={styles.info}>
        {description}
      </Text>
      {actions?.map(({ label, icon, onPress }, index) => (
        <Button
          key={index}
          label={label}
          onPress={onPress}
          icon={icon ? { name: icon } : undefined}
          ghost={index > 0}
          style={index > 0 && styles.extraButton}
        />
      ))}
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: { flexGrow: 100, padding: 25 },
  info: { marginTop: 10, marginBottom: 32, marginHorizontal: 20 },
  extraButton: { paddingTop: 30 },
});
