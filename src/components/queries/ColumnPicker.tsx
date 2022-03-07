import { useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { DropdownPicker, TextField, toOptions } from '../base';

type Props = {
  column: string;
  columnOptions: string[] | undefined;
  onUpdate: (column: string) => void;
  style?: StyleProp<ViewStyle>;
};

const ColumnPicker = ({ column, columnOptions, style, onUpdate }: Props) => {
  useEffect(() => {
    if (columnOptions?.length && !columnOptions.includes(column)) {
      onUpdate(columnOptions[0]);
    }
  }, [column, columnOptions, onUpdate]);

  return (
    <>
      {columnOptions?.length ? (
        <DropdownPicker
          options={toOptions(columnOptions)}
          selectedValue={column}
          onValueChange={onUpdate}
          style={style}
        />
      ) : (
        <TextField
          style={style}
          value={column}
          onChangeText={onUpdate}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="column"
        />
      )}
    </>
  );
};

export default ColumnPicker;
