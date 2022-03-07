import { StyleSheet } from 'react-native';
import { Spacings } from '../../utils';
import { Checkbox, Text, View } from '../base';
import ColumnPicker from './ColumnPicker';

type Props = {
  column: string;
  asc: boolean;
  columnOptions: string[] | undefined;
  onUpdateColumn: (by: string) => void;
  onUpdateAsc: (asc: boolean) => void;
};

const EditModifierSort = ({
  column,
  asc,
  columnOptions,
  onUpdateAsc,
  onUpdateColumn,
}: Props) => {
  return (
    <>
      <View center style={styles.operator}>
        <Text>SORT BY</Text>
      </View>

      <ColumnPicker
        column={column}
        columnOptions={columnOptions}
        onUpdate={onUpdateColumn}
        style={styles.flex}
      />

      <Checkbox
        title="ASC"
        checked={asc}
        onPress={() => onUpdateAsc(!asc)}
        style={styles.checkbox}
      />
    </>
  );
};

export default EditModifierSort;

const styles = StyleSheet.create({
  flex: { flexGrow: 1 },
  operator: { marginHorizontal: Spacings.s2 },
  checkbox: { marginHorizontal: Spacings.s2 },
});
