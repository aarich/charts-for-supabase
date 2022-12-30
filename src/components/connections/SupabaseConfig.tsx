import { StyleSheet } from 'react-native';

import { User } from '@supabase/supabase-js';

import { ConnectionDraft, Spacings } from '../../utils';
import { Text, TextField } from '../base';

type Props = {
  draft: ConnectionDraft;
  user?: User | null;
  onUpdate: (key: keyof ConnectionDraft) => (newValue: string) => void;
};

const SupabaseConfig = ({ draft, user, onUpdate }: Props) => {
  return (
    <>
      <TextField
        label="Supabase URL"
        value={draft.url}
        onChangeText={onUpdate('url')}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        style={styles.item}
      />
      <TextField
        label="Supabase Anon Key"
        value={draft.key}
        onChangeText={onUpdate('key')}
        autoCapitalize="none"
        autoComplete="off"
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
        autoComplete="off"
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
      {user ? (
        <Text>
          Logged in as {user.email ?? ''}: {user.id}
          {'\n'}
        </Text>
      ) : undefined}
    </>
  );
};

export default SupabaseConfig;

const styles = StyleSheet.create({ item: { marginTop: Spacings.s1 } });
