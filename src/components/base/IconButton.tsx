import { EvaStatus } from '@ui-kitten/components/devsupport';
import { Pressable, PressableProps } from 'react-native';
import { IconType } from '../../utils';
import { useStatusColor } from '../../utils/hooks';
import Icon from './Icon';

type Props = {
  name: IconType;
  size?: 'tiny' | 'small' | 'medium';
  status?: EvaStatus;
} & PressableProps;

export default ({ size = 'medium', status, name, ...props }: Props) => {
  const sizeNum: number = {
    tiny: 10,
    small: 14,
    medium: 18,
  }[size];
  const fill = useStatusColor(status);
  return (
    <Pressable {...props}>
      <Icon width={sizeNum} height={sizeNum} fill={fill} name={name} />
    </Pressable>
  );
};
