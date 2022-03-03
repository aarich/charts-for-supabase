import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import { useColorScheme } from '../../../utils/hooks';
import View from '../View';
import Button from './Button';
import Label from './Label';

type Props = {
  label: string;
  description?: string;
  value: Date;
  onChangeValue: (date: Date) => void;
};

const TimePicker = ({ description, label, value, onChangeValue }: Props) => {
  let labelElement = null;
  if (label) {
    labelElement = <Label label={label} tooltip={description} />;
  }

  const themeVariant = useColorScheme();
  const [pickerWidth, setPickerWidth] = useState(0);
  const [marginRight, setMarginHorizontal] = useState(0);
  const screenWidth = useWindowDimensions().width;

  useEffect(
    () => setMarginHorizontal(Math.floor((screenWidth - pickerWidth) / 2)),
    [pickerWidth, screenWidth]
  );

  const [show, setShow] = useState(Platform.OS === 'ios');

  return (
    <View>
      {labelElement}
      <View>
        {show ? (
          <View
            onLayout={({
              nativeEvent: {
                layout: { width },
              },
            }) => setPickerWidth((w) => w || width)}
            style={{ marginRight }}
          >
            <DateTimePicker
              value={value}
              mode="time"
              display="default"
              onChange={(_: unknown, newDate?: Date) => {
                onChangeValue(newDate || value);
                setShow(Platform.OS === 'ios');
              }}
              themeVariant={themeVariant}
              onTouchCancel={() => setShow(false)}
            />
          </View>
        ) : (
          <View row>
            <Button
              label={moment(value).format('hh:mm a')}
              ghost
              onPress={() => setShow(true)}
              status="basic"
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default TimePicker;
