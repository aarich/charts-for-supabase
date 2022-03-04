import { StyleSheet } from 'react-native';
import { IconsOutlined, IconType, Spacings } from '../../utils';
import { IconButton, Text, View } from '../base';

type Props = {
  onRemove: VoidFunction;
  onCopy: VoidFunction;
  onMoveUp?: VoidFunction;
  onMoveDown?: VoidFunction;
};

const renderButton = (
  isLeft: boolean,
  name: IconType,
  onPress: VoidFunction | undefined
) => (
  <IconButton
    name={name}
    style={isLeft ? styles.iconButtonLeft : styles.iconButtonRight}
    onPress={onPress}
    status={onPress ? 'primary' : 'basic'}
    disabled={!onPress}
  />
);

const RowEditFooterActions = ({
  onRemove,
  onCopy,
  onMoveDown,
  onMoveUp,
}: Props) => {
  return (
    <View row spread style={styles.container}>
      <View row>
        {renderButton(true, IconsOutlined.arrowheadDown, onMoveDown)}
        <View center>
          <Text category="c1" status="primary">
            Move
          </Text>
        </View>
        {renderButton(false, IconsOutlined.arrowheadUp, onMoveUp)}
      </View>
      <View row>
        {renderButton(true, IconsOutlined.copy, onCopy)}
        {renderButton(false, IconsOutlined.close, onRemove)}
      </View>
    </View>
  );
};

export default RowEditFooterActions;

const styles = StyleSheet.create({
  container: { marginVertical: Spacings.s1, marginHorizontal: Spacings.s4 },
  iconButtonLeft: { marginRight: Spacings.s2 },
  iconButtonRight: { marginLeft: Spacings.s2 },
});
