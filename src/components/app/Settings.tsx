import { setAppSetting } from '../../redux/actions';
import { useSetting } from '../../redux/selectors';
import { useAppDispatch } from '../../redux/store';
import { AppSetting } from '../../utils';
import { Button, Checkbox, Layout } from '../base';

type Props = {
  onResetApp: VoidFunction;
};

const Settings = ({ onResetApp }: Props) => {
  const dispatch = useAppDispatch();
  const requireAuth = useSetting(AppSetting.REQUIRE_LOCAL_AUTH);
  return (
    <Layout flex>
      <Checkbox
        title="Require local auth"
        checked={requireAuth}
        onPress={() =>
          dispatch(
            setAppSetting({ [AppSetting.REQUIRE_LOCAL_AUTH]: !requireAuth })
          )
        }
      />
      <Button label="Reset App" onPress={onResetApp} />
    </Layout>
  );
};

export default Settings;
