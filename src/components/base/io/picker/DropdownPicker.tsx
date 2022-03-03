import { IndexPath, Select, SelectItem } from '@ui-kitten/components';
import {
  forwardRef,
  ReactElement,
  Ref,
  useImperativeHandle,
  useRef,
} from 'react';
import View from '../../View';
import Label from '../Label';
import { PickerProps } from './pickerTypes';

type Props<T> = PickerProps<T>;

const DropdownPicker = forwardRef(
  <T extends string | number>(
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
  ) => {
    const selectedIndex = options.map((o) => o.value).indexOf(selectedValue);

    const selectRef = useRef<Select>(null);

    useImperativeHandle(ref, () => selectRef.current);

    return (
      <View style={style}>
        {label ? (
          <Label label={label} icon={icon} tooltip={description} />
        ) : null}

        <Select
          ref={selectRef}
          value={selectedIndex >= 0 ? options[selectedIndex].label : undefined}
          selectedIndex={new IndexPath(selectedIndex >= 0 ? selectedIndex : 0)}
          onSelect={(index) => {
            const selection = Array.isArray(index) ? index[0] : index;
            onValueChange(options[selection.row].value);
          }}
        >
          {options.map((item) => (
            <SelectItem key={item.value} title={item.label} />
          ))}
        </Select>
      </View>
    );
  }
) as <T>(p: Props<T> & { ref?: Ref<Select> }) => ReactElement;

export default DropdownPicker;
