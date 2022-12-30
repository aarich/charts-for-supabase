import { QueryInfo, QueryType, UpdateState } from '../../utils';
import { TextField } from '../base';
import EditModifiers from './EditModifiers';
import EditQueryType from './EditQueryType';
import EditReturnType from './EditReturnType';

type Props = {
  draft: QueryInfo;
  onUpdate: UpdateState<QueryInfo>;
};

const EditQuery = ({ onUpdate, draft }: Props) => {
  return (
    <>
      <TextField
        label="Name"
        value={draft.name}
        onChangeText={(name) => onUpdate({ ...draft, name })}
      />
      <EditQueryType draft={draft} onUpdate={onUpdate} />
      <EditReturnType
        table={draft.type === QueryType.SELECT ? draft.table : undefined}
        draft={draft.returnInfo}
        onUpdate={(returnInfo) => onUpdate({ ...draft, returnInfo })}
        queryInfo={draft}
      />
      <EditModifiers
        draft={draft}
        onUpdateModifiers={(modifiers) => onUpdate({ ...draft, modifiers })}
      />
    </>
  );
};

export default EditQuery;
