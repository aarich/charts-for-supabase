import { StyleProp, ViewStyle } from 'react-native';
import { IconType } from '../../../../utils';

export type PickerOption<T> = { label: string; value: T };

export type PickerProps<T> = {
  onValueChange: (newValue: T) => void;
  selectedValue: T;
  options: PickerOption<T>[];
  label?: string;
  description?: string;
  icon?: IconType;
  style?: StyleProp<ViewStyle>;
};
