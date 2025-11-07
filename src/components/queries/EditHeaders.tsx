import { StyleSheet } from 'react-native';
import { Icons, QueryInfo, Spacings } from '../../utils';
import { Button, IconButton, Label, TextField, View } from '../base';

type Props = {
  draft: QueryInfo;
  onUpdateHeaders: (updates: [string, string][]) => void;
};

const EditHeaders = ({ onUpdateHeaders: onUpdate, draft }: Props) => {
  const { headers = [] } = draft;

  const replaceAtIndex = (newHeader: [string, string], index: number) => {
    const before = headers.slice(0, index);
    const after = headers.slice(index + 1);
    onUpdate([...before, newHeader, ...after]);
  };

  const removeAtIndex = (index: number) => {
    const before = headers.slice(0, index);
    const after = headers.slice(index + 1);
    onUpdate([...before, ...after]);
  };

  const onAdd = () => onUpdate([...headers, ['', '']]);

  return (
    <>
      <Label label="Headers" style={styles.item} />
      {headers.map(([key, value], index) => (
        <View row center flex style={styles.container} key={index}>
          <TextField
            placeholder="Name"
            value={key}
            onChangeText={(val) => replaceAtIndex([val, value], index)}
            style={styles.input}
          />
          <TextField
            placeholder="Value"
            value={value}
            onChangeText={(val) => replaceAtIndex([key, val], index)}
            style={styles.input}
          />
          <View center>
            <IconButton
              status="danger"
              name={Icons.close}
              style={styles.closeButton}
              onPress={() => removeAtIndex(index)}
            />
          </View>
        </View>
      ))}
      <View center row>
        <Button
          ghost
          label="Add Header"
          onPress={onAdd}
          icon={{ name: Icons.plusCircle }}
        />
      </View>
    </>
  );
};

export default EditHeaders;

const styles = StyleSheet.create({
  item: { marginTop: Spacings.s2 },
  input: { flex: 1, marginRight: Spacings.s2 },
  container: { marginVertical: Spacings.s1 },
  closeButton: { marginHorizontal: Spacings.s1 },
});
