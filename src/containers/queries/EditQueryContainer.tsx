import { useCallback, useEffect, useReducer, useState } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { v4 as uuid } from 'uuid';
import { Button, Layout, Text, View } from '../../components/base';
import EditQuery from '../../components/queries/EditQuery';
import { saveQuery } from '../../redux/actions';
import { useAppDispatch } from '../../redux/store';
import {
  handleError,
  isQueryValid,
  QueryInfo,
  QueryReturnType,
  QueryType,
  Spacings,
} from '../../utils';
import { useNavTitle, useSchema } from '../../utils/hooks';
import connection from '../../api/database';

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
      scale: 'time',
    },
    type: QueryType.SELECT,
  };
};

const getDraft = (toEdit?: QueryInfo): QueryInfo =>
  toEdit ?? makeDefaultQueryInfo();

const EditQueryContainer = ({ queryToEdit, onSaved, onCancel }: Props) => {
  const dispatch = useAppDispatch();
  const schema = useSchema();
  const [showDebugInfo, toggleShowDebugInfo] = useReducer((b) => !b, false);
  const [debugQueryResult, setDebugQueryResult] = useState('');

  const [draft, setDraft] = useState(makeDefaultQueryInfo);

  useEffect(() => {
    setDraft(getDraft(queryToEdit));
  }, [queryToEdit]);

  const onSave = useCallback(() => {
    dispatch(saveQuery(draft)).then(onSaved).catch(handleError);
  }, [dispatch, draft, onSaved]);

  const runQuery = useCallback(async () => {
    try {
      const res = await connection.get()?.query(draft, schema);
      setDebugQueryResult(JSON.stringify(res, null, 2));
    } catch (e) {
      setDebugQueryResult('Error: ' + JSON.stringify(e, null, 2));
    }
  }, [draft, schema]);

  const canSave = isQueryValid(draft);

  useNavTitle(queryToEdit ? 'Edit Query' : 'New Query');

  return (
    <Layout flex style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <EditQuery draft={draft} onUpdate={setDraft} />
        <View row style={styles.buttons}>
          <Button label="Cancel" ghost status="basic" onPress={onCancel} />
          <Button
            label="Debug"
            ghost
            status="basic"
            onPress={toggleShowDebugInfo}
            style={styles.debugButton}
          />
          <Button
            label="Save"
            onPress={onSave}
            disabled={!canSave}
            style={styles.save}
          />
        </View>
        <View row style={styles.buttons}>
          {showDebugInfo && (
            <Button
              label="Test Query"
              ghost
              status="basic"
              onPress={runQuery}
            />
          )}
        </View>

        {showDebugInfo && (
          <>
            <Text style={styles.debugHeader}>Query Info</Text>
            <Text style={styles.debug}>
              {JSON.stringify(draft, null, 2) + '\n'}
            </Text>
            {debugQueryResult && (
              <>
                <Text style={styles.debugHeader}>Query Result</Text>
                <Text style={styles.debug}>{debugQueryResult}</Text>
              </>
            )}
          </>
        )}
      </KeyboardAwareScrollView>
    </Layout>
  );
};

export default EditQueryContainer;

const styles = StyleSheet.create({
  container: { padding: Spacings.s2 },
  buttons: { marginVertical: Spacings.s2 },
  save: { flexGrow: 1 },
  debugButton: { marginRight: Spacings.s4 },
  debug: { marginTop: Spacings.s2 },
  debugHeader: { fontWeight: 'bold' },
});
