import { StyleSheet } from 'react-native';
import { IconsOutlined, Spacings } from '../../utils';
import { IconButton, View } from '../base';

type Props = { onRemove: VoidFunction };

const ChartEditActions = ({ onRemove }: Props) => {
  const btns = [{ name: IconsOutlined.close, onPress: onRemove }];

  return (
    <View row spread style={styles.container}>
      {btns.map(({ name, onPress }) => (
        <IconButton
          key={name}
          name={name}
          onPress={onPress}
          disabled={!onPress}
        />
      ))}
    </View>
  );
};

export default ChartEditActions;

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacings.s1,
    marginLeft: Spacings.s4,
  },
});
