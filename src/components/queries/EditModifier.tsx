import { ReactElement, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import {
  getOperatorLabel,
  Icons,
  isBoolean,
  Modifier,
  ModifierType,
  Spacings,
} from '../../utils';
import { useColumnInfo, useColumns } from '../../utils/hooks';
import { IconButton, View } from '../base';
import EditModifierSingleOperator from './EditModifierSingleOperator';
import EditModifierSingleValue from './EditModifierSingleValue';
import EditModifierSort from './EditModifierSort';

type Props = {
  table: string | undefined;
  draft: Modifier;
  onUpdate: (updatedModifier: Modifier) => void;
  onRemove: VoidFunction;
};

const EditModifier = ({ table, draft, onUpdate, onRemove }: Props) => {
  const update = (key: string) => (value: string | boolean) =>
    onUpdate({ ...draft, [key]: value });

  const columns = useColumns(table);
  const columnInfo = useColumnInfo(
    table,
    'column' in draft ? draft.column : undefined
  );

  // Initialize boolean type to false
  useEffect(() => {
    if (
      columnInfo &&
      isBoolean(columnInfo) &&
      'value' in draft &&
      draft.value === ''
    ) {
      onUpdate({ ...draft, value: 'false' });
    }
  }, [columnInfo, draft, onUpdate]);

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
            columnInfo={columnInfo}
            columnOptions={columns}
            operator={getOperatorLabel(draft.type)}
            onUpdateColumn={update('column')}
            onUpdateValue={update('value')}
          />
        );
      case ModifierType.IN:
        return (
          <EditModifierSingleOperator
            columnInfo={columnInfo}
            columnOptions={columns}
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
            columnOptions={columns}
            column={draft.column}
            asc={draft.asc}
            onUpdateAsc={update('asc')}
            onUpdateColumn={update('column')}
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
    </View>
  );
};

export default EditModifier;

const styles = StyleSheet.create({
  container: { marginVertical: Spacings.s1 },
  closeButton: { marginHorizontal: Spacings.s1 },
});
