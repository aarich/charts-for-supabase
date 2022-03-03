import { StyleSheet } from 'react-native';
import {
  Icons,
  Param,
  QueryInfo,
  RPCQueryInfo,
  Spacings,
  UpdateState,
} from '../../utils';
import { Button, TextField, View } from '../base';
import EditQueryTypeRPCParam from './EditQueryTypeRPCParam';

type Props = {
  draft: RPCQueryInfo;
  onUpdate: UpdateState<QueryInfo>;
};

const EditQueryTypeRPCParams = ({ onUpdate, draft }: Props) => {
  const onAdd = () =>
    onUpdate({
      ...draft,
      params: [...draft.params, { name: '', type: 'string', value: '' }],
    });

  const onRemoveParamAt = (index: number) => {
    const params = [
      ...draft.params.slice(0, index),
      ...draft.params.slice(index + 1),
    ];
    onUpdate({ ...draft, params });
  };

  const onUpdateParam = (param: Param, index: number) => {
    const params = [
      ...draft.params.slice(0, index),
      param,
      ...draft.params.slice(index + 1),
    ];
    onUpdate({ ...draft, params });
  };

  return (
    <>
      <TextField
        label="RPC"
        value={draft.rpc}
        onChangeText={(rpc) => onUpdate({ ...draft, rpc })}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="function to call"
      />
      {draft.params.map((param, index) => (
        <EditQueryTypeRPCParam
          key={`${index}-${param.name}`}
          draft={param}
          onRemove={() => onRemoveParamAt(index)}
          onUpdate={(action) => {
            if (typeof action === 'function') {
              onUpdateParam(action(param), index);
            } else {
              onUpdateParam(action, index);
            }
          }}
        />
      ))}
      <View center row>
        <Button
          ghost
          label="Add Parameter"
          onPress={onAdd}
          icon={{ name: Icons.plusCircle }}
        />
      </View>
    </>
  );
};

export default EditQueryTypeRPCParams;

const styles = StyleSheet.create({ item: { marginTop: Spacings.s2 } });
