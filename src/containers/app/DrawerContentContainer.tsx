import {
  DrawerContentComponentProps,
  useDrawerProgress,
} from '@react-navigation/drawer';
import { memo } from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerContent } from '../../components/app/DrawerContent';

type Props = DrawerContentComponentProps;

const DrawerContentContainer = (props: Props) => {
  const { navigation } = props;

  const progress = useDrawerProgress() as Animated.Node<number>;

  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 0.5, 0.7, 0.8, 1],
    outputRange: [-100, -85, -70, -45, 0],
  });

  const paddingTop = useSafeAreaInsets().top;
  return (
    <Animated.View
      style={[styles.drawerContent, { transform: [{ translateX }] }]}
    >
      <DrawerContent
        onGoToScreen={(screen) => navigation.navigate(screen)}
        onToggleDrawer={() => navigation.toggleDrawer()}
        style={{ paddingTop }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
});

export default memo(DrawerContentContainer);
