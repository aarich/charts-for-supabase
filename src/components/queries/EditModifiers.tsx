import { StyleSheet } from 'react-native';
import {
  getOperatorLabel,
  Icons,
  Modifier,
  Modifiers,
  ModifierType,
  prompt,
  Spacings,
} from '../../utils';
import { Button, View } from '../base';
import Label from '../base/io/Label';
import EditModifier from './EditModifier';

type Props = {
  draft: Modifiers | undefined;
  onUpdate: (updates: Modifiers) => void;
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
      return { type: modifierType, by: '', asc: true };
    case ModifierType.IN:
      return { type: modifierType, column: '', values: [] };
  }
};

const EditModifiers = ({ onUpdate, draft = [] }: Props) => {
  const replaceAtIndex = (newModifer: Modifier, index: number) => {
    const before = draft.slice(0, index);
    const after = draft.slice(index + 1);
    onUpdate([...before, newModifer, ...after]);
  };

  const removeAtIndex = (index: number) => {
    const before = draft.slice(0, index);
    const after = draft.slice(index + 1);
    onUpdate([...before, ...after]);
  };

  const onAdd = async () => {
    const [value, cancelled] = await prompt('', 'Choose a modifier type', {
      options: Object.values(ModifierType).map((value) => ({
        label: getOperatorLabel(value),
        value,
      })),
    });
    if (!cancelled) {
      onUpdate([...draft, getDefaultModifier(value as ModifierType)]);
    }
  };

  return (
    <>
      <Label label="Modifiers" style={styles.item} />
      {draft?.map((draft, index) => (
        <EditModifier
          key={index}
          draft={draft}
          onUpdate={(modifier) => replaceAtIndex(modifier, index)}
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
