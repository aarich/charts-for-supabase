import { useCallback } from 'react';
import HomeEdit from '../../components/home/HomeEdit';
import { deleteRow, moveRowUp, setRow } from '../../redux/actions';
import { useDashboard } from '../../redux/selectors';
import { useAppDispatch } from '../../redux/store';
import { DashboardRow } from '../../utils';

const HomeEditContainer = () => {
  const dispatch = useAppDispatch();
  const { rows } = useDashboard();

  const onSetRow = useCallback(
    (row: DashboardRow, index?: number) => dispatch(setRow([row, index])),
    [dispatch]
  );

  const onRemove = useCallback(
    (index: number) => dispatch(deleteRow(index)),
    [dispatch]
  );

  const onMoveUp = useCallback(
    (index: number) => dispatch(moveRowUp(index)),
    [dispatch]
  );

  return (
    <HomeEdit
      rows={rows}
      onSetRow={onSetRow}
      onRemove={onRemove}
      onMoveUp={onMoveUp}
    />
  );
};

export default HomeEditContainer;
