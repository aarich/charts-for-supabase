import { produce } from 'immer';
import { AnyAction } from 'redux';
import { QueryInfo } from '../../utils';
import { deleteQuery, reset, setQuery } from '../actions';

type QueryState = {
  [queryId: string]: QueryInfo;
};

const initialState: QueryState = {};

const QueryReducer = (state = initialState, action: AnyAction): QueryState =>
  produce(state, (draft) => {
    if (setQuery.match(action)) {
      draft[action.payload.id] = action.payload;
    } else if (deleteQuery.match(action)) {
      delete draft[action.payload.id];
    } else if (reset.match(action)) {
      return initialState;
    }
  });

export default QueryReducer;
