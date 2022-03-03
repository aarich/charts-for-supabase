import { useCallback } from 'react';
import Settings from '../../components/app/Settings';
import { reset } from '../../redux/actions';
import { useAppDispatch } from '../../redux/store';
import { alert, toast } from '../../utils';

type Props = {};

const SettingsContainer = ({}: Props) => {
  const dispatch = useAppDispatch();
  const onReset = useCallback(() => {
    const doReset = () => {
      dispatch(reset());
      toast('Reset!');
    };
    alert(
      'Reset',
      "Are you sure you'd like to reset the app? You will stay connected but your queries and customizations will be gone forever",
      [{ text: 'Reset', style: 'destructive', onPress: doReset }]
    );
  }, [dispatch]);
  return <Settings onResetApp={onReset} />;
};

export default SettingsContainer;
