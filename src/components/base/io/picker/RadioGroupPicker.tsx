import { Radio, RadioGroup } from '@ui-kitten/components';
import { ViewStyle } from 'react-native';
import View from '../../View';
import Label from '../Label';
import { PickerProps } from './pickerTypes';

type Props<T> = {
  vertical?: boolean;
} & PickerProps<T>;

const RadioGroupPicker = <T extends string>({
  onValueChange,
  selectedValue,
  options,
  label,
  description,
  icon,
  vertical,
  style,
}: Props<T>) => {
  const groupStyle: ViewStyle = {
    justifyContent: 'space-around',
    flexDirection: vertical ? undefined : 'row',
  };

  const selectedIndex = options.map((o) => o.value).indexOf(selectedValue);

  return (
    <View style={style}>
      {label ? <Label label={label} icon={icon} tooltip={description} /> : null}

      <RadioGroup
        selectedIndex={selectedIndex >= 0 ? selectedIndex : undefined}
        onChange={(index) => onValueChange(options[index].value)}
        style={groupStyle}
      >
        {options.map((item) => (
          <Radio key={item.value}>{item.label}</Radio>
        ))}
      </RadioGroup>
    </View>
  );
};

export default RadioGroupPicker;
