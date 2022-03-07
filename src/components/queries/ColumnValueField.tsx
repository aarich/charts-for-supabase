import { OpenAPIV2 } from 'openapi-types';
import { StyleProp, ViewStyle } from 'react-native';
import { isBoolean, isDate, isNumeric } from '../../utils';
import { Checkbox, DatePicker, Label, TextField, View } from '../base';

type Props = {
  value: string;
  placeholder?: string;
  columnInfo: OpenAPIV2.SchemaObject | undefined;
  style?: StyleProp<ViewStyle>;
  onUpdate: (value: string) => void;
};

const ColumnValueField = ({
  value,
  placeholder = 'value',
  columnInfo,
  style,
  onUpdate,
}: Props) => {
  if (columnInfo && isDate(columnInfo)) {
    const date = new Date(value ? parseInt(value) : Date.now());
    return (
      <DatePicker
        date={date}
        onSelect={(d) => onUpdate(`${d.getTime()}`)}
        style={style}
      />
    );
  }

  if (columnInfo && isBoolean(columnInfo)) {
    const boolean = value === 'true';
    return (
      <View style={style}>
        <Label label="Value" />
        <Checkbox
          title=""
          checked={boolean}
          onPress={() => onUpdate(boolean ? 'false' : 'true')}
        />
      </View>
    );
  }

  return (
    <TextField
      style={style}
      value={value}
      onChangeText={onUpdate}
      autoCapitalize="none"
      autoCorrect={false}
      placeholder={placeholder}
      keyboardType={columnInfo && isNumeric(columnInfo) ? 'numeric' : undefined}
    />
  );
};

export default ColumnValueField;
