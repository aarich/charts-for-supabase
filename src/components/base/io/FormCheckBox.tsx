import {
  CheckBox,
  CheckBoxProps,
  PopoverPlacements,
  Tooltip,
} from '@ui-kitten/components';
import { useState } from 'react';
import { Dimensions, StyleProp, ViewStyle } from 'react-native';
import { IconsOutlined } from '../../../utils';
import IconButton from '../IconButton';
import View from '../View';

type Props = {
  checked: boolean;
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  tooltip?: string;
} & CheckBoxProps;

const FormCheckBox = ({
  checked,
  title,
  onPress,
  disabled,
  style,
  tooltip,
  ...props
}: Props) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <View style={style} row>
      <CheckBox
        disabled={disabled}
        checked={checked}
        onChange={onPress}
        {...props}
      >
        {title}
      </CheckBox>
      {tooltip ? (
        <Tooltip
          visible={tooltipVisible}
          style={{ width: Dimensions.get('screen').width * 0.6 }}
          placement={PopoverPlacements.TOP}
          anchor={() => (
            <View center>
              <IconButton
                onPress={() => setTooltipVisible(true)}
                name={IconsOutlined.info}
                size="small"
                status="basic"
              />
            </View>
          )}
          onBackdropPress={() => setTooltipVisible(false)}
        >
          {tooltip}
        </Tooltip>
      ) : undefined}
    </View>
  );
};

export default FormCheckBox;
