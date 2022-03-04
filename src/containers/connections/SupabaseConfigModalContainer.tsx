import { parse, useURL } from 'expo-linking';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import connection from '../../api/database';
import { Button, CenteredModal, View } from '../../components/base';
import SupabaseConfig from '../../components/connections/SupabaseConfig';
import { saveConnection } from '../../redux/actions';
import { useSetting } from '../../redux/selectors';
import { useAppDispatch } from '../../redux/store';
import {
  AppSetting,
  ConnectionDraft,
  getSavedPassword,
  handleError,
  showConnectionSettings,
  Spacings,
  toast,
} from '../../utils';

type Props = {
  visible: boolean;
  onClose: VoidFunction;
};

const SupabaseConfigModalContainer = ({ visible, onClose }: Props) => {
  const storedConfig = useSetting(AppSetting.SUPABASE_CONFIG);
  const dispatch = useAppDispatch();
  const [draft, setDraft] = useState<ConnectionDraft>({
    url: '',
    key: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (storedConfig) {
      getSavedPassword().then(
        (password) => password && setDraft({ ...storedConfig, password })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const title = storedConfig ? 'Edit Connection' : 'New Connection';

  const onSave = useCallback(() => {
    dispatch(saveConnection(draft, draft.password))
      .then(() => {
        onClose();
        toast('Client Created!');
      })
      .catch(handleError);
  }, [dispatch, draft, onClose]);

  const canSave = draft.key && draft.url;

  useEffect(() => {
    storedConfig && connection.init(storedConfig, draft.password);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const appUrl = useURL();
  useEffect(() => {
    if (!appUrl) {
      return;
    }

    const { queryParams } = parse(appUrl);

    const { key, url, email } = queryParams || {};

    if (!key && !url && !email) {
      return;
    }

    // We have received config from the url
    setDraft((d) => ({
      key: key ?? d.key,
      url: url ?? d.url,
      email: email ?? d.email,
      password: d.password,
    }));
    showConnectionSettings();
  }, [appUrl]);

  return (
    <CenteredModal
      visible={visible}
      onRequestClose={onClose}
      title={title}
      avoidKeyboard
    >
      <SupabaseConfig
        draft={draft}
        onUpdate={(key: keyof ConnectionDraft) => (value: string) =>
          setDraft((old) => ({ ...old, [key]: value }))}
      />
      <View row right style={styles.buttons}>
        <Button
          label="Cancel"
          outline
          status="basic"
          onPress={onClose}
          style={styles.cancelBtn}
        />
        <Button label="Save" onPress={onSave} disabled={!canSave} />
      </View>
    </CenteredModal>
  );
};

export default SupabaseConfigModalContainer;

const styles = StyleSheet.create({
  buttons: { marginTop: Spacings.s3 },
  cancelBtn: { marginRight: Spacings.s3 },
});
