import { forwardRef, PropsWithChildren, useImperativeHandle } from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import View from './View';

type Props = PropsWithChildren<{
  sectionHeader?: JSX.Element;
  expanded: boolean;
  onPress?: VoidFunction;
}> &
  TouchableOpacityProps;

export type ExpandableSectionRef = {
  press: VoidFunction;
};

const ExpandableSection = forwardRef<ExpandableSectionRef, Props>(
  ({ expanded, sectionHeader, children, ...props }, ref) => {
    const onPress = () => {
      props.onPress?.();
      LayoutAnimation.configureNext({
        ...LayoutAnimation.Presets.easeInEaseOut,
        duration: 300,
      });
    };

    useImperativeHandle(ref, () => ({ press: onPress }));

    return (
      <View style={styles.container}>
        <TouchableOpacity {...props} onPress={onPress}>
          {sectionHeader}
        </TouchableOpacity>
        {expanded ? children : null}
      </View>
    );
  }
);

export default ExpandableSection;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});
