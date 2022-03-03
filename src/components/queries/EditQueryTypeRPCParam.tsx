import { StyleSheet } from 'react-native';
import {
  alert,
  Icons,
  IconsOutlined,
  Param,
  Spacings,
  update,
  UpdateState,
} from '../../utils';
import { Button, Checkbox, IconButton, TextField, View } from '../base';
import Label from '../base/io/Label';

type Props = {
  draft: Param;
  onUpdate: UpdateState<Param>;
  onRemove: VoidFunction;
};

const EditQueryTypeRPCParam = ({ onUpdate, draft, onRemove }: Props) => {
  const typeOptions: { text: string; type: Param['type'] }[] = [
    { text: 'String', type: 'string' },
    { text: 'Number', type: 'number' },
    { text: 'Boolean', type: 'boolean' },
  ];

  const onPressTypeChange = () => {
    alert(
      'Data Type',
      'The value will be parsed into the selected data type',
      typeOptions.map(({ text, type }) => ({
        text,
        onPress: () => onUpdate((old) => ({ ...old, type })),
        style: type === draft.type ? 'destructive' : undefined,
      }))
    );
  };

  const renderValue = () => {
    if (draft.type === 'boolean') {
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
          keyboardType={draft.type === 'number' ? 'numeric' : undefined}
          style={styles.value}
        />
      );
    }
  };

  return (
    <View row flex style={styles.container}>
      <TextField
        label="Parameter"
        value={draft.name}
        onChangeText={update('name', onUpdate)}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.name}
      />
      {renderValue()}
      <View center>
        <View row center>
          <Label label="Type" />
        </View>
        <Button
          icon={{
            name: {
              number: IconsOutlined.hash,
              string: IconsOutlined.text,
              boolean: IconsOutlined.checkbox,
            }[draft.type],
          }}
          ghost
          onPress={onPressTypeChange}
        />
      </View>
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
