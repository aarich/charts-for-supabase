import { useEffect, useMemo } from 'react';
import { useSetting } from '../../redux/selectors';
import {
  AppSetting,
  getRPCNames,
  Icons,
  Param,
  QueryInfo,
  RPCQueryInfo,
  UpdateState,
} from '../../utils';
import { Button, DropdownPicker, View } from '../base';
import EditQueryTypeRPCParam from './EditQueryTypeRPCParam';

type Props = {
  draft: RPCQueryInfo;
  onUpdate: UpdateState<QueryInfo>;
};

const EditQueryTypeRPC = ({ onUpdate, draft }: Props) => {
  const onAdd = () =>
    onUpdate({ ...draft, params: [...draft.params, { name: '', value: '' }] });

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

  const schema = useSetting(AppSetting.SUPABASE_SCHEMA);
  const names = useMemo(() => getRPCNames(schema), [schema]);

  useEffect(() => {
    if (names?.length && !names.includes(draft.rpc)) {
      onUpdate((old) => ({ ...old, rpc: names[0] }));
    }
  }, [draft.rpc, names, onUpdate]);

  return (
    <>
      <DropdownPicker
        label="RPC"
        options={names?.map((value) => ({ label: value, value })) ?? []}
        selectedValue={draft.rpc}
        onValueChange={(rpc) => onUpdate({ ...draft, rpc, params: [] })}
      />
      {draft.params.map((param, index) => (
        <EditQueryTypeRPCParam
          key={`${index}-${param.name}`}
          rpc={draft.rpc}
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

export default EditQueryTypeRPC;
