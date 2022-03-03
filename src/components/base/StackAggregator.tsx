/* eslint-disable react-native/no-inline-styles */
import { Children, FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  LayoutAnimation,
  LayoutChangeEvent,
  Platform,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { IconsOutlined } from '../../utils';
import { Button, Card } from './io';
import View from './View';

const PEEP = 8;
const DURATION = 300;
const MARGIN_BOTTOM = 24;
const buttonStartValue = 0.8;

const screenWidth = Dimensions.get('screen').width;
const useNativeDriver = Platform.OS !== 'web';
const easeOut = Easing.bezier(0, 0, 0.58, 1);

const StackAggregator: FC = ({ children }) => {
  const animatedScale = useRef(new Animated.Value(buttonStartValue));
  const animatedOpacity = useRef(new Animated.Value(buttonStartValue));
  const animatedContentOpacity = useRef(new Animated.Value(0));
  const itemsCount = Children.count(children);

  const [collapsed, setCollapsed] = useState(true);
  const [firstItemHeight, setFirstItemHeight] = useState<number>();

  const getItemScale = useCallback(
    (index: number) => {
      if (collapsed) {
        if (index === itemsCount - 2) {
          return 0.95;
        } else if (index === itemsCount - 1) {
          return 0.9;
        }
      }
      return 1;
    },
    [collapsed, itemsCount]
  );

  const animatedScaleArray = useRef(
    Children.map(children, (_item, index) => {
      return new Animated.Value(getItemScale(index));
    }) as Animated.Value[]
  );

  const animateValues = useCallback(() => {
    const newValue = collapsed ? buttonStartValue : 1;
    return new Promise((resolve) => {
      Animated.parallel([
        Animated.timing(animatedOpacity.current, {
          duration: DURATION,
          toValue: Number(newValue),
          useNativeDriver,
        }),
        Animated.timing(animatedScale.current, {
          toValue: Number(newValue),
          easing: easeOut,
          duration: DURATION,
          useNativeDriver,
        }),
        Animated.timing(animatedContentOpacity.current, {
          toValue: Number(collapsed ? 0 : 1),
          easing: easeOut,
          duration: DURATION,
          useNativeDriver,
        }),
      ]).start(resolve);
    });
  }, [collapsed]);

  const animateCards = useCallback(() => {
    const promises = [];
    for (let index = 0; index < itemsCount; index++) {
      const newScale = getItemScale(index);

      promises.push(
        new Promise((resolve) => {
          Animated.timing(animatedScaleArray.current[index], {
            toValue: Number(newScale),
            easing: easeOut,
            duration: DURATION,
            useNativeDriver,
          }).start(resolve);
        })
      );
    }
    return Promise.all(promises);
  }, [getItemScale, itemsCount]);

  const animate = useCallback(async () => {
    return Promise.all([animateValues(), animateCards()]);
  }, [animateCards, animateValues]);
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    animate();
  }, [animate, collapsed]);

  const close = () => {
    setCollapsed(true);
  };

  const open = () => {
    setCollapsed(false);
  };

  const getTop = (index: number) => {
    let start = 0;

    if (index === itemsCount - 2) {
      start += PEEP;
    }
    if (index === itemsCount - 1) {
      start += PEEP * 2;
    }

    return start;
  };

  const getStyle = (index: number): StyleProp<ViewStyle> => {
    const top = getTop(index);

    if (collapsed) {
      return {
        position: index !== 0 ? 'absolute' : undefined,
        top,
      };
    }
    return {
      marginBottom: MARGIN_BOTTOM,
      marginTop: index === 0 ? 40 : undefined,
    };
  };

  const onLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;

    if (height) {
      setFirstItemHeight(height);
    }
  };

  const renderItem = (item: JSX.Element | JSX.Element[], index: number) => {
    return (
      <Animated.View
        key={index}
        onLayout={index === 0 ? onLayout : undefined}
        style={[
          Platform.OS === 'ios' && styles.containerShadow,
          getStyle(index),
          {
            alignSelf: 'center',
            zIndex: itemsCount - index,
            transform: [{ scaleX: animatedScaleArray.current[index] }],
            width: screenWidth - 40,
            height: collapsed ? firstItemHeight : undefined,
          },
        ]}
        collapsable={false}
      >
        <Card style={styles.card} padded>
          <Animated.View
            style={
              index !== 0
                ? { opacity: animatedContentOpacity.current }
                : undefined
            }
            collapsable={false}
          >
            {item}
          </Animated.View>
        </Card>
      </Animated.View>
    );
  };

  return (
    <View>
      <View style={{ marginBottom: PEEP * 3 }}>
        <Animated.View
          style={{
            position: 'absolute',
            right: 0,
            opacity: animatedOpacity.current,
            transform: [{ scale: animatedScale.current }],
          }}
        >
          <Button
            label="Show less"
            icon={{ name: IconsOutlined.arrowUpCircle }}
            appearance="ghost"
            size="small"
            style={styles.showLess}
            onPress={close}
          />
        </Animated.View>

        {Children.map(children, (item, index) =>
          renderItem(item as JSX.Element | JSX.Element[], index)
        )}

        {collapsed ? (
          <TouchableOpacity
            onPress={open}
            activeOpacity={1}
            style={[
              styles.touchable,
              {
                height: firstItemHeight
                  ? firstItemHeight + PEEP * 2
                  : undefined,
                zIndex: itemsCount,
              },
            ]}
          />
        ) : null}
      </View>
    </View>
  );
};

export default StackAggregator;

const styles = StyleSheet.create({
  showLess: { marginHorizontal: 24, marginBottom: 20 },
  touchable: {
    position: 'absolute',
    width: '100%',
  },
  containerShadow: {
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { height: 5, width: 0 },
  },
  card: {
    overflow: 'hidden',
    flexShrink: 1,
  },
});
