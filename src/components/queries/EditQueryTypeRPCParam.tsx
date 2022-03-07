import { useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Icons, Param, Spacings, update, UpdateState } from '../../utils';
import { useRPCParamInfo, useRPCParams } from '../../utils/hooks';
import {
  Checkbox,
  DropdownPicker,
  IconButton,
  Label,
  TextField,
  toOptions,
  View,
} from '../base';

type Props = {
  rpc: string;
  draft: Param;
  onUpdate: UpdateState<Param>;
  onRemove: VoidFunction;
};

const EditQueryTypeRPCParam = ({ rpc, onUpdate, draft, onRemove }: Props) => {
  const params = useRPCParams(rpc);
  const paramNames = useMemo(
    () => (params ? Object.keys(params) : []),
    [params]
  );
  const paramInfo = useRPCParamInfo(rpc, draft.name);

  useEffect(() => {
    if (paramNames.length && !paramNames.includes(draft.name)) {
      onUpdate({ ...draft, name: paramNames[0] });
    }
  }, [draft, onUpdate, paramNames]);

  const renderValue = () => {
    if (paramInfo?.type === 'boolean') {
      return (
        <View style={styles.checkbox}>
          <Label label="Value" />
          <Checkbox
            title=""
            checked={draft.value === 'true'}
            onPress={() =>
              onUpdate({
                ...draft,
                value: draft.value === 'true' ? 'false' : 'true',
              })
            }
            style={styles.value}
          />
        </View>
      );
    } else {
      return (
        <TextField
          label="Value"
          value={draft.value}
          onChangeText={update('value', onUpdate)}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={paramInfo?.type === 'integer' ? 'numeric' : undefined}
          style={styles.value}
        />
      );
    }
  };

  return (
    <View row flex style={styles.container}>
      <DropdownPicker
        label="Parameter"
        selectedValue={draft.name}
        onValueChange={update('name', onUpdate)}
        options={toOptions(paramNames)}
        style={styles.name}
      />
      {renderValue()}
      <View center>
        <Label label=" " />
        <IconButton name={Icons.close} onPress={onRemove} />
      </View>
    </View>
  );
};

export default EditQueryTypeRPCParam;

const styles = StyleSheet.create({
  container: { marginTop: Spacings.s2 },
  name: { flex: 1, marginRight: Spacings.s1 },
  value: { flex: 1, marginRight: Spacings.s1 },
  checkbox: { marginHorizontal: Spacings.s3 },
});
