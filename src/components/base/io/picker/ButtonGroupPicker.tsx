import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Spacings } from '../../../../utils';
import Button from '../Button';
import Label from '../Label';
import Text from '../Text';
import { PickerProps } from './pickerTypes';

const getBorderStyleForPosition = (index: number, childCount: number) => {
  switch (index) {
    case 0:
      return styles.firstButton;
    case childCount - 1:
      return styles.lastButton;
    default:
      return styles.middleButton;
  }
};

const ButtonGroupPicker = <T extends string>({
  onValueChange,
  selectedValue,
  options,
  label,
  description,
  icon,
  style,
}: PickerProps<T>) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [values, setValues] = useState<T[]>([]);

  useEffect(() => {
    setValues(options.map((option) => option.value));
  }, [options]);

  const handlePress = (newIndex: number) => {
    setSelectedIndex(newIndex);
    onValueChange(values[newIndex]);
  };

  useEffect(() => {
    const index = options.map((option) => option.value).indexOf(selectedValue);
    setSelectedIndex(index);
  }, [options, selectedValue]);

  return (
    <View style={[style, styles.container]}>
      <View style={styles.label}>
        {label ? <Label label={label} icon={icon} /> : undefined}
        {description ? (
          <Text hint category="c2">
            {description}
          </Text>
        ) : undefined}
      </View>
      <View style={styles.row}>
        {options.map((option, i) => (
          <Button
            key={option.label}
            label={option.label}
            appearance={selectedIndex === i ? 'filled' : 'outline'}
            onPress={() => handlePress(i)}
            style={[
              styles.buttonFullWidth,
              getBorderStyleForPosition(i, options.length),
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default ButtonGroupPicker;

const styles = StyleSheet.create({
  buttonFullWidth: { flexGrow: 1 },
  container: { paddingBottom: 10 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  firstButton: {
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
  },
  label: { marginVertical: Spacings.s1 },
  lastButton: {
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
  },
  middleButton: {
    borderRadius: 0,
  },
});
