import * as WebBrowser from 'expo-web-browser';
import { ComponentPropsWithoutRef } from 'react';
import { Linking, Platform } from 'react-native';
import { getIconSize, Icons } from '../../utils';
import { useStatusColor } from '../../utils/hooks';
import Icon from './Icon';
import Text from './io/Text';

type Props = {
  url?: string;
  text: string;
  showIcon?: boolean;
} & ComponentPropsWithoutRef<typeof Text>;

const Anchor = ({
  url,
  text,
  showIcon,
  onPress: onPressProp,
  status = 'primary',
  ...textProps
}: Props) => {
  const color = useStatusColor(status);

  const onPress =
    onPressProp ??
    (() =>
      url &&
      Platform.select({
        web: () => Linking.openURL(url),
        default: () => WebBrowser.openBrowserAsync(url),
      })());

  const iconSize = getIconSize(textProps.category);

  return (
    <Text status={status} onPress={onPress} {...textProps}>
      {text}
      <>
        {showIcon ? (
          <>
            {' '}
            <Icon
              name={Icons.externalLink}
              width={iconSize}
              height={iconSize}
              fill={color}
            />
          </>
        ) : undefined}
      </>
    </Text>
  );
};

export const a = (
  url: string,
  text: string,
  options: Omit<Props, 'url' | 'text'> = {}
) => {
  const fixedUrl = url.startsWith('http') ? url : `https://${url}`;
  return <Anchor url={fixedUrl} text={text} {...options} />;
};

export default Anchor;
