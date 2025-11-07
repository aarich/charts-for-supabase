import {
  DrawerContentComponentProps,
  useDrawerProgress,
} from '@react-navigation/drawer';
import { memo, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerContent } from '../../components/app/DrawerContent';
import { reset } from '../../redux/actions';
import { useAppDispatch } from '../../redux/store';
import { alert } from '../../utils';

type Props = DrawerContentComponentProps;

const DrawerContentContainer = (props: Props) => {
  const { navigation } = props;
  const dispatch = useAppDispatch();

  const progress = useDrawerProgress();

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      progress.value,
      [0, 0.5, 0.7, 0.8, 1],
      [-100, -85, -70, -45, 0]
    );
    return {
      transform: [{ translateX }],
    };
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
    <Animated.View style={[styles.drawerContent, animatedStyle]}>
      <DrawerContent
        onGoToScreen={(screen) => navigation.navigate('RootStack', { screen })}
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
