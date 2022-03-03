import { StyleSheet } from 'react-native';
import { IconType } from '../../utils';
import { Button, Text, View } from '../base';

type Props = {
  buttons: { title: string; icon: IconType; onPress: () => void }[];
};

const Feedback = ({ buttons }: Props) => {
  return (
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
