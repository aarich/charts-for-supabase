import { PropsWithChildren, useEffect, useRef } from 'react';
import { Animated, Easing, Platform, StyleSheet } from 'react-native';

import { Modal } from '@ui-kitten/components';

import { useKeyboardSize } from '../../utils/hooks';
import { Card, Text } from './io';

type Props = {
  title?: string;
  visible: boolean;
  onRequestClose: () => void;
  avoidKeyboard?: boolean;
};

const CenteredModal = ({
  visible,
  onRequestClose,
  children,
  title,
  avoidKeyboard,
}: PropsWithChildren<Props>) => {
  const keyboardSize = useKeyboardSize();
  const paddingBottom = useRef(new Animated.Value(0));

  useEffect(() => {
    if (avoidKeyboard) {
      Animated.timing(paddingBottom.current, {
        toValue: keyboardSize * 0.6,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.quad,
      }).start();
    }
  }, [avoidKeyboard, keyboardSize, paddingBottom]);

  return (
    <Modal
      visible={visible}
      onBackdropPress={onRequestClose}
      backdropStyle={styles.backdrop}
    >
      <Animated.View style={{ paddingBottom: paddingBottom.current }}>
        <Card style={styles.card} padded disabled={Platform.OS !== 'web'}>
          {title ? (
            <Text category="h5" center>
              {title}
            </Text>
          ) : undefined}
          {children}
        </Card>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  backdrop: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  card: { marginHorizontal: 10 },
});

export default CenteredModal;
