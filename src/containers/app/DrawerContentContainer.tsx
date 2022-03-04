import {
  DrawerContentComponentProps,
  useDrawerProgress,
} from '@react-navigation/drawer';
import { memo, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerContent } from '../../components/app/DrawerContent';
import { reset } from '../../redux/actions';
import { useAppDispatch } from '../../redux/store';
import { alert } from '../../utils';

type Props = DrawerContentComponentProps;

const DrawerContentContainer = (props: Props) => {
  const { navigation } = props;
  const dispatch = useAppDispatch();

  const progress = useDrawerProgress() as Animated.Node<number>;

  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 0.5, 0.7, 0.8, 1],
    outputRange: [-100, -85, -70, -45, 0],
  });

  const paddingTop = useSafeAreaInsets().top;

  const onResetApp = useCallback(() => {
    alert(
      'Reset App',
      'Are you sure? Your connection settings will remain but all queries and dashboard customizations will be gone forever',
      [
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => dispatch(reset()),
        },
      ]
    );
  }, [dispatch]);

  return (
    <Animated.View
      style={[styles.drawerContent, { transform: [{ translateX }] }]}
    >
      <DrawerContent
        onGoToScreen={(screen) => navigation.navigate(screen)}
        onToggleDrawer={() => navigation.toggleDrawer()}
        onResetApp={onResetApp}
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
