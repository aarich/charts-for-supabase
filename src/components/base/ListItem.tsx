import { ListItem as UIKListItem, ListItemProps } from '@ui-kitten/components';
import * as React from 'react';
import { ComponentPropsWithoutRef, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icons, IconType } from '../../utils';
import Badge from './Badge';
import Icon from './Icon';
import { Text } from './io';

type Props = {
  icon?: IconType;
  title: string;
  description?: string;
  badge?: ComponentPropsWithoutRef<typeof Badge>;
  chevronOverride?: IconType | boolean;
  rightIcon?: IconType | React.ReactElement;
  titleNumberOfLines?: number;
  descriptionNumberOfLines?: number;
} & ListItemProps;

const ListItem = ({
  icon,
  badge,
  chevronOverride,
  rightIcon,
  title,
  description,
  descriptionNumberOfLines = 1,
  titleNumberOfLines = 2,
  ...otherProps
}: Props) => {
  const accessoryLeft: Props['accessoryLeft'] = icon
    ? (props) => <Icon name={icon} {...props} />
    : undefined;
  const accessoryRight: Props['accessoryRight'] = (props) => (
    <View style={styles.row}>
      {badge ? <Badge {...badge} /> : undefined}
      {rightIcon ? (
        typeof rightIcon === 'string' ? (
          <Icon {...props} name={rightIcon} />
        ) : (
          rightIcon
        )
      ) : undefined}
      {typeof chevronOverride === 'string' ||
      typeof chevronOverride === 'undefined' ? (
        <Icon {...props} name={chevronOverride || Icons.chevronRight} />
      ) : undefined}
    </View>
  );

  const titleComp = <Text numberOfLines={titleNumberOfLines}>{title}</Text>;

  const descriptionComp = description ? (
    <Text s1 numberOfLines={descriptionNumberOfLines}>
      {description}
    </Text>
  ) : undefined;

  return (
    <UIKListItem
      title={titleComp}
      description={descriptionComp}
      accessoryLeft={accessoryLeft}
      accessoryRight={accessoryRight}
      {...otherProps}
    />
  );
};

export default memo<typeof ListItem>(ListItem);

const styles = StyleSheet.create({ row: { flexDirection: 'row' } });
