import { StyleSheet } from 'react-native';
import { IconsOutlined, Spacings } from '../../utils';
import { Button, Layout, Text, View } from '../base';

type Props = {
  storageUsage: string;
  onReset: () => void;
};

const ResetCache = ({ storageUsage, onReset }: Props) => {
  return (
    <Layout l2 style={styles.container}>
      <Text center>
        Seeing something buggy? Clear the cache to reset your app data, without
        logging you out. This may briefly increase data usage as you
        incrementally reload various assets.
      </Text>
      <Text category="p2" center style={styles.usage}>
        {storageUsage}
      </Text>

      <View row center>
        <Button
          ghost
          label="Reset"
          icon={{ name: IconsOutlined.refresh, size: 20 }}
          onPress={onReset}
          style={styles.button}
        />
      </View>
    </Layout>
  );
};

export default ResetCache;

const styles = StyleSheet.create({
  button: { paddingTop: Spacings.s8 },
  container: { flex: 1, justifyContent: 'center', padding: 10 },
  usage: { marginTop: 10 },
});
