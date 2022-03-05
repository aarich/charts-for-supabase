import { useState } from 'react';
import { Param, QueryInfo, QueryType, UpdateState } from '../../utils';
import { ButtonGroupPicker } from '../base';
import EditQueryTypeRPC from './EditQueryTypeRPC';
import EditQueryTypeSelect from './EditQueryTypeSelect';

type Props = {
  draft: QueryInfo;
  onUpdate: UpdateState<QueryInfo>;
};

const EditQueryType = ({ onUpdate, draft }: Props) => {
  const [cachedInfo, setCachedInfo] = useState<{
    table?: string;
    rpc?: string;
    select?: string;
    params?: Param[];
  }>({});

  const handleQueryTypeChange = (newType: QueryType) => {
    if (newType === draft.type) {
      return;
    }

    const { rpc = '', table = '', select = '', params = [] } = cachedInfo;

    if (draft.type === QueryType.RPC) {
      setCachedInfo({ ...cachedInfo, rpc: draft.rpc });
    } else if (draft.type === QueryType.SELECT) {
      setCachedInfo({
        ...cachedInfo,
        table: draft.table,
        select: draft.select,
      });
    }

    // common fields
    const { name, id, returnInfo, modifiers } = draft;
    const common = { name, id, returnInfo, modifiers };

    switch (newType) {
      case QueryType.RPC:
        onUpdate({ ...common, type: newType, rpc, params });
        break;
      case QueryType.SELECT:
        onUpdate({ ...common, type: newType, select, table });
        break;
    }
  };

  return (
    <>
      <ButtonGroupPicker
        label="Type"
        options={[
          { label: 'Select', value: QueryType.SELECT },
          { label: 'RPC', value: QueryType.RPC },
        ]}
        selectedValue={draft.type}
        onValueChange={handleQueryTypeChange}
      />
      {draft.type === QueryType.RPC ? (
        <EditQueryTypeRPC draft={draft} onUpdate={onUpdate} />
      ) : (
        <EditQueryTypeSelect draft={draft} onUpdate={onUpdate} />
      )}
    </>
  );
};

export default EditQueryType;
