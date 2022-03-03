import { StyleSheet } from 'react-native';
import { Spacings } from '../../utils';
import { Checkbox, Text, TextField, View } from '../base';

type Props = {
  by: string;
  asc: boolean;
  onUpdateBy: (by: string) => void;
  onUpdateAsc: (asc: boolean) => void;
};

const EditModifierSort = ({ by, asc, onUpdateAsc, onUpdateBy }: Props) => {
  return (
    <>
      <View center style={styles.operator}>
        <Text>SORT BY</Text>
      </View>
      <TextField
        style={styles.flex}
        value={by}
        onChangeText={onUpdateBy}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="column"
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
