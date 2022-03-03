import { TopNavigationAction } from '@ui-kitten/components';
import { EvaStatus } from '@ui-kitten/components/devsupport';
import { ComponentPropsWithoutRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { IconType } from '../../utils';
import { useStatusColor, useTextColor } from '../../utils/hooks';
import HeaderButton from './HeaderButton';
import Icon from './Icon';
import { Text } from './io';
import View from './View';

type Props = {
  status?: EvaStatus;
  subtitle?: string;
  icon: IconType;
} & ComponentPropsWithoutRef<typeof HeaderButton>;

const StatefulIcon = ({
  status,
  subtitle,
  icon,
  onPress,
  ...actionProps
}: Props) => {
  const color = useStatusColor(status);
  const textColor = useTextColor();
  return (
    <View center>
      <TouchableOpacity onPress={onPress}>
        <TopNavigationAction
          icon={(p) => {
            return (
              <Icon name={icon} fill={status ? color : textColor} {...p} />
            );
          }}
          {...actionProps}
          onPress={onPress}
        />
        {subtitle ? (
          <Text category="c1" status={status} center>
            {subtitle}
          </Text>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default StatefulIcon;
