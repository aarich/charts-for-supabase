import { setStringAsync } from 'expo-clipboard';
import { useCallback, useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';

import connection from '../../api/database';
import { Button, CenteredModal, View } from '../../components/base';
import SupabaseConfig from '../../components/connections/SupabaseConfig';
import { saveConnection, saveSchema } from '../../redux/actions';
import { useSetting } from '../../redux/selectors';
import { useAppDispatch } from '../../redux/store';
import {
    AppSetting, ConnectionDraft, getSavedPassword, handleError, log, Spacings, toast, UpdateState
} from '../../utils';

type Props = {
  visible: boolean;
  onClose: VoidFunction;
  draft: ConnectionDraft;
  setDraft: UpdateState<ConnectionDraft>;
};

const SupabaseConfigModalContainer = ({
  visible,
  onClose,
  draft,
  setDraft,
}: Props) => {
  const storedConfig = useSetting(AppSetting.SUPABASE_CONFIG);
  const schema = useSetting(AppSetting.SUPABASE_SCHEMA);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (storedConfig && Platform.OS !== 'web') {
      getSavedPassword().then(
        (password) => password && setDraft((d) => ({ ...d, password }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const title = storedConfig ? 'Edit Connection' : 'New Connection';

  const onSave = useCallback(() => {
    const { password, ...toSave } = draft;
    dispatch(saveConnection(toSave, password))
      .then(() => {
        onClose();
        toast('Client Created!');
      })
      .catch(handleError);
  }, [dispatch, draft, onClose]);

  const canSave = draft.key && draft.url;

  useEffect(() => {
    if (storedConfig) {
      connection.init(storedConfig, draft.password).catch(handleError);
      if (!schema) {
        dispatch(saveSchema(storedConfig));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const user = connection.get()?.user;

  const onCopyUserId = () => {
    user &&
      setStringAsync(user.id)
        .then(() => {
          toast('Copied!');
          onClose();
        })
        .catch((e) => {
          log("Couldn't copy", e);
          toast("Couldn't copy...", 'danger');
        });
  };

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
        user={user}
      />
      <View row right style={styles.buttons}>
        {user ? (
          <Button
            label="Copy User Id"
            ghost
            status="basic"
            onPress={onCopyUserId}
          />
        ) : undefined}
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
