import { StyleSheet } from 'react-native';
import {
  getOperatorLabel,
  Icons,
  Modifier,
  Modifiers,
  ModifierType,
  prompt,
  QueryInfo,
  QueryType,
  Spacings,
} from '../../utils';
import { Button, Label, View } from '../base';
import EditModifier from './EditModifier';

type Props = {
  draft: QueryInfo;
  onUpdateModifiers: (updates: Modifiers) => void;
};

const getDefaultModifier = (modifierType: ModifierType): Modifier => {
  switch (modifierType) {
    case ModifierType.EQ:
    case ModifierType.NEQ:
    case ModifierType.LT:
    case ModifierType.GT:
    case ModifierType.LTE:
    case ModifierType.GTE:
    case ModifierType.LIKE:
      return { type: modifierType, column: '', value: '' };
    case ModifierType.LIMIT:
      return { type: modifierType, value: '' };
    case ModifierType.SORT:
      return { type: modifierType, column: '', asc: true };
    case ModifierType.IN:
      return { type: modifierType, column: '', values: [] };
  }
};

const EditModifiers = ({ onUpdateModifiers: onUpdate, draft }: Props) => {
  const { modifiers = [] } = draft;

  const replaceAtIndex = (newModifer: Modifier, index: number) => {
    const before = modifiers.slice(0, index);
    const after = modifiers.slice(index + 1);
    onUpdate([...before, newModifer, ...after]);
  };

  const removeAtIndex = (index: number) => {
    const before = modifiers.slice(0, index);
    const after = modifiers.slice(index + 1);
    onUpdate([...before, ...after]);
  };

  const onAdd = async () => {
    const [newType, cancelled] = await prompt('', 'Choose a modifier type', {
      options: Object.values(ModifierType).map((value) => ({
        label: getOperatorLabel(value),
        value,
      })),
    });
    if (!cancelled) {
      onUpdate([...modifiers, getDefaultModifier(newType as ModifierType)]);
    }
  };

  return (
    <>
      <Label label="Modifiers" style={styles.item} />
      {modifiers.map((modifier, index) => (
        <EditModifier
          key={index}
          table={draft.type === QueryType.SELECT ? draft.table : undefined}
          draft={modifier}
          onUpdate={(updated) => replaceAtIndex(updated, index)}
          onRemove={() => removeAtIndex(index)}
        />
      ))}
      <View center row>
        <Button
          ghost
          label="Add Modifer"
          onPress={onAdd}
          icon={{ name: Icons.plusCircle }}
        />
      </View>
    </>
  );
};

export default EditModifiers;

const styles = StyleSheet.create({ item: { marginTop: Spacings.s2 } });
