import { StyleSheet } from 'react-native';
import { IconsOutlined, Spacings } from '../../utils';
import { IconButton, View } from '../base';

type Props = {
  onRemove: VoidFunction;
  onEdit: VoidFunction;
};

const ChartEditFooterActions = ({ onRemove, onEdit }: Props) => {
  const btns = [
    { name: IconsOutlined.settings, onPress: onEdit },
    { name: IconsOutlined.close, onPress: onRemove },
  ];

  return (
    <View row spread style={styles.container}>
      {btns.map(({ name, onPress }) => (
        <IconButton
          key={name}
          name={name}
          style={styles.iconButton}
          onPress={onPress}
          disabled={!onPress}
        />
      ))}
    </View>
  );
};

export default ChartEditFooterActions;

const styles = StyleSheet.create({
  container: { marginVertical: Spacings.s1, marginHorizontal: Spacings.s4 },
  iconButton: { margin: Spacings.s2 },
});
