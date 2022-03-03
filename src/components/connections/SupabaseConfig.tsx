import { StyleSheet } from 'react-native';
import { ConnectionDraft, Spacings } from '../../utils';
import { Text, TextField } from '../base';

type Props = {
  draft: ConnectionDraft;
  onUpdate: (key: keyof ConnectionDraft) => (newValue: string) => void;
};

const SupabaseConfig = ({ draft, onUpdate }: Props) => {
  return (
    <>
      <Text>
        Reminder: this connection has the same privileges as an end user, so RLS
        policies apply.
      </Text>
      <TextField
        label="Supabase URL"
        value={draft.url}
        onChangeText={onUpdate('url')}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        style={styles.item}
      />
      <TextField
        label="Supabase Anon Key"
        value={draft.key}
        onChangeText={onUpdate('key')}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        style={styles.item}
      />
      <TextField
        tooltip="Optionally sign in via email authentication"
        label="Supabase User Email"
        value={draft.email}
        onChangeText={onUpdate('email')}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        placeholder="optional"
        style={styles.item}
      />
      <TextField
        label="Supabase User Password"
        value={draft.password}
        onChangeText={onUpdate('password')}
        secureTextEntry
        placeholder="optional"
        style={styles.item}
      />
    </>
  );
};

export default SupabaseConfig;

const styles = StyleSheet.create({ item: { marginTop: Spacings.s1 } });
