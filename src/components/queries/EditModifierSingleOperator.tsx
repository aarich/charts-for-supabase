import { OpenAPIV2 } from 'openapi-types';
import { StyleSheet } from 'react-native';
import { Spacings } from '../../utils';
import { Text, View } from '../base';
import ColumnPicker from './ColumnPicker';
import ColumnValueField from './ColumnValueField';

type Props = {
  column: string;
  operator: string;
  value: string;
  valuePlaceholder?: string;
  columnOptions: string[] | undefined;
  columnInfo: OpenAPIV2.SchemaObject | undefined;
  onUpdateColumn: (column: string) => void;
  onUpdateValue: (value: string) => void;
};

const EditModifierSingleOperator = ({
  column,
  operator,
  value,
  valuePlaceholder = 'value',
  columnOptions,
  columnInfo,
  onUpdateColumn,
  onUpdateValue,
}: Props) => {
  return (
    <>
      <ColumnPicker
        column={column}
        onUpdate={onUpdateColumn}
        columnOptions={columnOptions}
        style={styles.flex}
      />

      <View center style={styles.operator}>
        <Text>{operator}</Text>
      </View>

      <ColumnValueField
        value={value}
        onUpdate={onUpdateValue}
        style={styles.flex}
        columnInfo={columnInfo}
        placeholder={valuePlaceholder}
      />
    </>
  );
};

export default EditModifierSingleOperator;

const styles = StyleSheet.create({
  flex: { flexGrow: 1 },
  operator: { marginHorizontal: Spacings.s2 },
});
