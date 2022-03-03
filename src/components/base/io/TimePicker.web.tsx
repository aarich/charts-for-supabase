/* eslint-disable filenames/match-exported */

import { PickerOption } from '.';
import DropdownPicker from './picker/DropdownPicker';

type Props = {
  label: string;
  description?: string;
  value: Date;
  onChangeValue: (date: Date) => void;
};

const options: PickerOption<number>[] = [];
for (let i = 0; i < 24 * 60; i += 15) {
  const h = Math.floor(i / 60);
  const m = i % 60;

  const hLabel = h === 0 ? '12' : `${h < 10 ? '0' : ''}${h % 12}`;
  const mLabel = `${m < 10 ? '0' : ''}${m}`;
  const amPm = h < 12 ? 'am' : 'pm';
  options.push({ label: `${hLabel}:${mLabel} ${amPm}`, value: i });
}

const TimePicker = ({ description, label, value, onChangeValue }: Props) => {
  const onValueChange = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    onChangeValue(
      new Date(value.getFullYear(), value.getMonth(), value.getDate(), h, m)
    );
  };

  let selectedValue = value.getHours() * 60 + value.getMinutes();
  selectedValue = Math.floor(selectedValue / 15) * 15;

  return (
    <DropdownPicker
      options={options}
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      label={label}
      description={description}
    />
  );
};

export default TimePicker;
