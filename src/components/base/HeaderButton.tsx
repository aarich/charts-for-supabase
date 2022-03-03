import {
  TopNavigationAction,
  TopNavigationActionProps,
} from '@ui-kitten/components';
import { IconType } from '../../utils';
import Icon from './Icon';

type Props = {
  icon: IconType;
  disabled?: boolean;
} & Omit<TopNavigationActionProps, 'icon'>;

const HeaderButton = ({ icon, ...props }: Props) => {
  return (
    <TopNavigationAction icon={(p) => <Icon {...p} name={icon} />} {...props} />
  );
};

export default HeaderButton;
