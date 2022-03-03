import { EvaStatus } from '@ui-kitten/components/devsupport';
import { useEffect, useRef, useState } from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, Text } from './io';

type Props = {
  visible: boolean;
  status: EvaStatus;
  message: string;
};
const Toast = ({ visible, status, message }: Props) => {
  const [animating, setAnimating] = useState(false);

  const opacity = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    setAnimating(true);
    const toValue = visible ? 1 : 0;
    Animated.timing(opacity, {
      toValue,
      duration: 300,
      useNativeDriver: Platform.OS !== 'web',
    }).start(() => setAnimating(false));
  }, [opacity, visible]);

  const bottom = Math.max(useSafeAreaInsets().bottom, 20) + 10;

  return visible || animating ? (
    <View style={[styles.view, { bottom }]}>
      <Animated.View style={{ opacity }}>
        <Card style={styles.card} status={status} padded>
          <Text style={styles.message} center>
            {message}
          </Text>
        </Card>
      </Animated.View>
    </View>
  ) : null;
};

export default Toast;

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 2,
    marginHorizontal: 5,
  },
  message: { fontWeight: 'bold' },
  view: {
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
});
