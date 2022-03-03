import {
  PopoverPlacements,
  Text,
  TextProps,
  Tooltip,
} from '@ui-kitten/components';
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { IconsOutlined, IconType } from '../../../utils';
import { useTextColor } from '../../../utils/hooks';
import Icon from '../Icon';

type Props = {
  label: string;
  icon?: IconType;
  tooltip?: string;
} & TextProps;

const Label = ({ label, icon, tooltip, ...textProps }: Props) => {
  const iconFill = useTextColor('hint');

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const computedIcon = icon || (tooltip ? IconsOutlined.info : undefined);

  const { appearance = 'hint', category = 'label' } = textProps;

  // @ts-ignore
  const iconSize: number = { s1: 18 }[category] || 12;

  return (
    <Tooltip
      anchor={() => (
        <Pressable
          style={styles.row}
          onPress={tooltip ? () => setTooltipVisible(true) : undefined}
        >
          <Text {...textProps} appearance={appearance} category={category}>
            {label}
          </Text>
          {computedIcon ? (
            <>
              <Text> </Text>
              <Icon
                name={computedIcon}
                width={iconSize}
                height={iconSize}
                fill={iconFill}
              />
            </>
          ) : undefined}
        </Pressable>
      )}
      visible={tooltipVisible}
      onBackdropPress={() => setTooltipVisible(false)}
      placement={PopoverPlacements.TOP_START}
    >
      {tooltip || ''}
    </Tooltip>
  );
};

export default Label;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
