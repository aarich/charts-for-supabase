import { KeyboardType, StyleSheet } from 'react-native';
import { getOperatorLabel, ModifierType, Spacings } from '../../utils';
import { Text, TextField, View } from '../base';

type Props = {
  modifierType: ModifierType;
  value: string;
  onUpdateValue: (value: string) => void;
  keyboardType?: KeyboardType;
};

const EditModifierSingleValue = ({
  modifierType,
  value,
  keyboardType = 'numeric',
  onUpdateValue,
}: Props) => {
  return (
    <>
      <View center style={styles.operator}>
        <Text>{getOperatorLabel(modifierType)}</Text>
      </View>
      <TextField
        style={styles.flex}
        value={value}
        onChangeText={onUpdateValue}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="value"
        keyboardType={keyboardType}
      />
    </>
  );
};

export default EditModifierSingleValue;

const styles = StyleSheet.create({
  flex: { flexGrow: 1 },
  operator: { marginHorizontal: Spacings.s2 },
});
