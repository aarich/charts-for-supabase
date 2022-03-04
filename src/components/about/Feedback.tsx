import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconType } from '../../utils';
import { Button, Layout, Text, View } from '../base';

type Props = {
  buttons: { title: string; icon: IconType; onPress: () => void }[];
};

const Feedback = ({ buttons }: Props) => {
  const paddingBottom = useSafeAreaInsets().bottom;
  return (
    <Layout l2 flex style={{ paddingBottom }}>
      <View center flex>
        <Text category="h6" style={styles.descText}>
          Thanks for taking the time to share your feedback!
        </Text>
        <View row center>
          <View>
            {buttons.map(({ title, icon, onPress }) => (
              <View key={title} row>
                <Button
                  ghost
                  label={title}
                  icon={{ name: icon, size: 25 }}
                  onPress={onPress}
                />
              </View>
            ))}
          </View>
        </View>
        <View style={styles.descText} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  descText: {
    textAlign: 'center',
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
});

export default Feedback;
