import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { QueryInfo, SelectQueryInfo, Spacings, UpdateState } from '../../utils';
import { useTableNames } from '../../utils/hooks';
import { DropdownPicker, TextField } from '../base';

type Props = {
  draft: SelectQueryInfo;
  onUpdate: UpdateState<QueryInfo>;
};

const EditQueryTypeSelect = ({ onUpdate, draft }: Props) => {
  const tables = useTableNames();
  useEffect(() => {
    if (tables?.length && !tables.includes(draft.table)) {
      onUpdate({ ...draft, table: tables[0], select: draft.select || '*' });
    }
  }, [draft, onUpdate, tables]);
  return (
    <>
      {tables?.length ? (
        <DropdownPicker
          label="From"
          selectedValue={draft.table}
          options={tables.map((value) => ({ label: value, value }))}
          onValueChange={(table) => onUpdate({ ...draft, table })}
        />
      ) : (
        <TextField
          label="From"
          value={draft.table}
          onChangeText={(table) => onUpdate({ ...draft, table })}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="table/view name"
        />
      )}
      <TextField
        label="Select"
        value={draft.select}
        onChangeText={(select) => onUpdate({ ...draft, select })}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.item}
        placeholder="* or comma separated list"
      />
      {draft.returnInfo.type === 'table' ? (
        <TextField
          label="URL (optional)"
          tooltip="Enter a template string. Use {{column}} to insert merge fields. Click on a row to open this URL in a browser."
          value={draft.urlTemplate}
          onChangeText={(urlTemplate) => onUpdate({ ...draft, urlTemplate })}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.item}
          placeholder="e.g. example.com/item/{{id}}"
        />
      ) : null}
    </>
  );
};

export default EditQueryTypeSelect;

const styles = StyleSheet.create({ item: { marginTop: Spacings.s2 } });
