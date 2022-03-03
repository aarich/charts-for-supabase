import { ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import {
  getOperatorLabel,
  Icons,
  Modifier,
  ModifierType,
  Spacings,
} from '../../utils';
import { IconButton, View } from '../base';
import EditModifierSingleOperator from './EditModifierSingleOperator';
import EditModifierSingleValue from './EditModifierSingleValue';
import EditModifierSort from './EditModifierSort';

type Props = {
  draft: Modifier;
  onUpdate: (updatedModifier: Modifier) => void;
  onRemove: VoidFunction;
};

const EditModifier = ({ onUpdate, draft, onRemove }: Props) => {
  const update = (key: string) => (value: string | boolean) =>
    onUpdate({ ...draft, [key]: value });

  const renderSettings = (): ReactElement => {
    switch (draft.type) {
      case ModifierType.EQ:
      case ModifierType.NEQ:
      case ModifierType.LT:
      case ModifierType.GT:
      case ModifierType.LTE:
      case ModifierType.GTE:
      case ModifierType.LIKE:
        return (
          <EditModifierSingleOperator
            column={draft.column}
            value={draft.value}
            operator={getOperatorLabel(draft.type)}
            onUpdateColumn={update('column')}
            onUpdateValue={update('value')}
          />
        );
      case ModifierType.IN:
        return (
          <EditModifierSingleOperator
            column={draft.column}
            value={draft.values.join(',')}
            operator={getOperatorLabel(draft.type)}
            onUpdateColumn={update('column')}
            onUpdateValue={(value) => {
              const values = value.split(',').map((v) => v.trim());
              onUpdate({ ...draft, values });
            }}
            valuePlaceholder="values"
          />
        );
      case ModifierType.LIMIT:
        return (
          <EditModifierSingleValue
            onUpdateValue={update('value')}
            value={draft.value}
            modifierType={draft.type}
          />
        );
      case ModifierType.SORT:
        return (
          <EditModifierSort
            by={draft.by}
            asc={draft.asc}
            onUpdateAsc={update('asc')}
            onUpdateBy={update('by')}
          />
        );
    }
  };

  return (
    <View row center style={styles.container}>
      {renderSettings()}
      <View center>
        <IconButton
          status="danger"
          name={Icons.close}
          style={styles.closeButton}
          onPress={onRemove}
        />
      </View>
      {/* <Button ghost status="danger" label="Remove" onPress={onRemove} /> */}
    </View>
  );
};

export default EditModifier;

const styles = StyleSheet.create({
  container: { marginVertical: Spacings.s1 },
  closeButton: { marginHorizontal: Spacings.s1 },
});
