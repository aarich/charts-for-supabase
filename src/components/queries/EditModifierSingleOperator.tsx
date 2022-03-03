import { StyleSheet } from 'react-native';
import { Spacings } from '../../utils';
import { Text, TextField, View } from '../base';

type Props = {
  column: string;
  operator: string;
  value: string;
  onUpdateColumn: (column: string) => void;
  onUpdateValue: (value: string) => void;
  valuePlaceholder?: string;
};

const EditModifierSingleOperator = ({
  column,
  operator,
  value,
  valuePlaceholder = 'value',
  onUpdateColumn,
  onUpdateValue,
}: Props) => {
  return (
    <>
      <TextField
        style={styles.flex}
        value={column}
        onChangeText={onUpdateColumn}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="column"
      />
      <View center style={styles.operator}>
        <Text>{operator}</Text>
      </View>
      <TextField
        style={styles.flex}
        value={value}
        onChangeText={onUpdateValue}
        autoCapitalize="none"
        autoCorrect={false}
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
