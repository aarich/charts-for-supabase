import { StyleSheet } from 'react-native';
import { DashboardRow, IconsOutlined, MAX_HEIGHT, Spacings } from '../../utils';
import { IconButton, Text, View } from '../base';

type Props = {
  row: DashboardRow;
  onUpdate: (row: DashboardRow) => void;
  onRemove: VoidFunction;
  onCopy: VoidFunction;
  onMoveUp?: VoidFunction;
  onMoveDown?: VoidFunction;
};

const RowEditFooterActions = ({
  row,
  onUpdate,
  onRemove,
  onCopy,
  onMoveDown,
  onMoveUp,
}: Props) => {
  const onExpand =
    row.height < MAX_HEIGHT
      ? () => {
          onUpdate({
            ...row,
            height: (row.height + 1) as DashboardRow['height'],
          });
        }
      : undefined;

  const onCollapse =
    row.height > 1
      ? () => {
          onUpdate({
            ...row,
            height: (row.height - 1) as DashboardRow['height'],
          });
        }
      : undefined;

  const btns = [
    { name: IconsOutlined.arrowheadDown, onPress: onMoveDown },
    { name: IconsOutlined.arrowheadUp, onPress: onMoveUp },
    { name: IconsOutlined.plus, onPress: onExpand },
    { name: IconsOutlined.minus, onPress: onCollapse },
    { name: IconsOutlined.copy, onPress: onCopy },
    { name: IconsOutlined.close, onPress: onRemove },
  ];
  const labels = ['Move', 'Height', ''];

  return (
    <View row spread style={styles.container}>
      {[0, 2, 4].map((i) => (
        <View row key={i}>
          <IconButton
            name={btns[i].name}
            style={styles.iconButtonLeft}
            onPress={btns[i].onPress}
            status={btns[i].onPress ? 'primary' : 'basic'}
            disabled={!btns[i].onPress}
          />
          <View center>
            <Text category="c1" status="primary">
              {labels[i / 2]}
            </Text>
          </View>
          <IconButton
            name={btns[i + 1].name}
            style={styles.iconButtonRight}
            onPress={btns[i + 1].onPress}
            status={btns[i + 1].onPress ? 'primary' : 'basic'}
            disabled={!btns[i + 1].onPress}
          />
        </View>
      ))}
    </View>
  );
};

export default RowEditFooterActions;

const styles = StyleSheet.create({
  container: { marginVertical: Spacings.s1, marginHorizontal: Spacings.s4 },
  iconButtonLeft: { marginRight: Spacings.s2 },
  iconButtonRight: { marginLeft: Spacings.s2 },
});
