import { produce } from 'immer';
import { AnyAction } from 'redux';
import { DashboardRow } from '../../utils';
import {
  deleteRow,
  moveChartLeft,
  moveRowUp,
  reset,
  setChart,
  setRow,
} from '../actions';

type DashboardState = {
  rows: DashboardRow[];
};

const initialState: DashboardState = { rows: [] };

const DashboardReducer = (
  state = initialState,
  action: AnyAction
): DashboardState =>
  produce(state, (draft) => {
    if (setRow.match(action)) {
      const [row, index] = action.payload;
      if (typeof index === 'number') {
        draft.rows[index] = row;
      } else {
        draft.rows.push(row);
      }
    } else if (moveRowUp.match(action)) {
      const tmp = draft.rows[action.payload];
      draft.rows[action.payload] = draft.rows[action.payload - 1];
      draft.rows[action.payload - 1] = tmp;
    } else if (setChart.match(action)) {
      const { chart, chartIndex, rowIndex } = action.payload;
      draft.rows[rowIndex].charts[chartIndex] = chart;
    } else if (moveChartLeft.match(action)) {
      const { chartIndex, rowIndex } = action.payload;
      const { charts } = draft.rows[rowIndex];
      const tmp = charts[chartIndex];
      charts[chartIndex] = charts[chartIndex - 1];
      charts[chartIndex - 1] = tmp;
    } else if (deleteRow.match(action)) {
      draft.rows.splice(action.payload, 1);
    } else if (reset.match(action)) {
      return initialState;
    }
  });

export default DashboardReducer;
