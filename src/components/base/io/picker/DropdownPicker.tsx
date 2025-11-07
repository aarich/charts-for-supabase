import { IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { Ref } from 'react';
import { StyleSheet } from 'react-native';
import { Spacings } from '../../../../utils';
import Icon from '../../Icon';
import View from '../../View';
import Label from '../Label';
import { PickerProps } from './pickerTypes';

type Props<T> = PickerProps<T>;

function DropdownPicker<T extends string | number>(
  {
    onValueChange,
    selectedValue,
    options,
    label,
    description,
    icon,
    style,
  }: Props<T>,
  ref?: Ref<Select | null>
) {
  const selectedIndex = options.map((o) => o.value).indexOf(selectedValue);

  return (
    <View style={style}>
      {label ? (
        <Label
          label={label}
          icon={icon}
          tooltip={description}
          style={styles.label}
        />
      ) : null}

      <Select
        ref={ref}
        value={selectedIndex >= 0 ? options[selectedIndex].label : undefined}
        selectedIndex={new IndexPath(selectedIndex >= 0 ? selectedIndex : 0)}
        onSelect={(index) => {
          const selection = Array.isArray(index) ? index[0] : index;
          onValueChange(options[selection.row].value);
        }}
      >
        {options.map(({ value, label: optionLabel, icon: optionIcon }) => (
          <SelectItem
            key={value}
            title={optionLabel}
            accessoryRight={
              optionIcon
                ? (props) => <Icon name={optionIcon} {...props} />
                : undefined
            }
          />
        ))}
      </Select>
    </View>
  );
}

export default DropdownPicker;

const styles = StyleSheet.create({ label: { marginBottom: Spacings.s1 } });
