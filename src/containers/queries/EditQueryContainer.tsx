import { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { v4 as uuid } from 'uuid';
import { Button, Layout, View } from '../../components/base';
import EditQuery from '../../components/queries/EditQuery';
import { saveQuery } from '../../redux/actions';
import { useAppDispatch } from '../../redux/store';
import {
  handleError,
  QueryInfo,
  QueryReturnType,
  QueryType,
  Spacings,
} from '../../utils';
import { useNavTitle } from '../../utils/hooks';

type Props = {
  queryToEdit?: QueryInfo;
  onSaved: (id: string) => void;
  onCancel: VoidFunction;
};

const makeDefaultQueryInfo = (): QueryInfo => {
  return {
    id: uuid(),
    name: '',
    table: '',
    select: '',
    returnInfo: {
      type: QueryReturnType.LINEAR,
      xColumn: '',
      yColumn: '',
      scale: 'linear',
    },
    type: QueryType.SELECT,
  };
};

const getDraft = (toEdit?: QueryInfo): QueryInfo =>
  toEdit ?? makeDefaultQueryInfo();

const EditQueryContainer = ({ queryToEdit, onSaved, onCancel }: Props) => {
  const dispatch = useAppDispatch();

  const [draft, setDraft] = useState<QueryInfo>(makeDefaultQueryInfo());

  useEffect(() => {
    setDraft(getDraft(queryToEdit));
  }, [queryToEdit]);

  const onSave = useCallback(() => {
    dispatch(saveQuery(draft)).then(onSaved).catch(handleError);
  }, [dispatch, draft, onSaved]);

  const canSave = !!draft.name;

  useNavTitle(queryToEdit ? 'Edit Query' : 'New Query');

  return (
    <Layout flex style={styles.container}>
      <KeyboardAwareScrollView style={styles.container}>
        <EditQuery draft={draft} onUpdate={setDraft} />
        <View row spread style={styles.buttons}>
          <Button label="Cancel" ghost status="basic" onPress={onCancel} />
          <Button
            label="Save"
            onPress={onSave}
            disabled={!canSave}
            style={styles.save}
          />
        </View>
      </KeyboardAwareScrollView>
    </Layout>
  );
};

export default EditQueryContainer;

const styles = StyleSheet.create({
  container: { padding: Spacings.s2 },
  buttons: { marginVertical: Spacings.s2 },
  save: { flexGrow: 1 },
});
