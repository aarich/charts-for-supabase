// eslint-disable-next-line no-restricted-imports
import { Button as UIKButton, ButtonProps, Icon } from '@ui-kitten/components';
import { IconType, log } from '../../../utils';

type Props = {
  icon?: {
    name: IconType;
    size?: number;
    onRight?: boolean;
  };
  outline?: boolean;
  ghost?: boolean;
  label?: string;
} & ButtonProps;

const Button = ({
  label,
  icon,
  outline,
  ghost,
  appearance: passedAppearance,
  ...props
}: Props) => {
  let appearance: Props['appearance'] = passedAppearance || 'filled';
  if (outline) {
    appearance = 'outline';
  } else if (ghost) {
    appearance = 'ghost';
  }

  if (outline && ghost) {
    log('Both outline and ghost were set!');
  }

  const accessory: Props['accessoryLeft'] = icon
    ? (p) => <Icon {...p} name={icon.name} size={icon.size} />
    : undefined;

  return (
    <UIKButton
      appearance={appearance}
      accessoryLeft={icon?.onRight ? undefined : accessory}
      accessoryRight={icon?.onRight ? accessory : undefined}
      {...props}
    >
      {label}
    </UIKButton>
  );
};

export default Button;
