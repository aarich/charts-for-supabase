import {
  Drawer,
  DrawerGroup,
  DrawerItem,
  MenuItemProps,
} from '@ui-kitten/components';
import { ReactElement } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import connection from '../../api/database';
import {
  IconsOutlined,
  IconType,
  MyConstants,
  RootStackParamList,
  showConnectionSettings,
  Spacings,
} from '../../utils';
import { Badge, Icon, Text, View } from '../base';

type Props = {
  onGoToScreen: (name: keyof RootStackParamList) => void;
  onToggleDrawer: VoidFunction;
  onResetApp: VoidFunction;
  style?: StyleProp<ViewStyle>;
};

const RESET = 'Reset App';

type MenuItem = {
  icon: IconType;
  title?: string;
  dest: keyof RootStackParamList | typeof RESET;
};

const items: MenuItem[] = [
  { icon: IconsOutlined.globe, dest: 'Queries' },
  { icon: IconsOutlined.grid, title: 'Customize Dashboard', dest: 'HomeEdit' },
  { icon: IconsOutlined.book, dest: 'Help' },
];

const more: MenuItem[] = [
  { icon: IconsOutlined.info, dest: 'About' },
  { icon: IconsOutlined.bulb, dest: 'Feedback' },
  { icon: IconsOutlined.refresh, dest: RESET },
];

export function DrawerContent({
  onGoToScreen,
  onToggleDrawer,
  onResetApp,
  style,
}: Props) {
  const onPressItem = (dest: MenuItem['dest']) => {
    switch (dest) {
      case RESET:
        onToggleDrawer();
        onResetApp();
        break;
      default:
        onGoToScreen(dest);
        break;
    }
  };

  const client = connection.get();

  const renderItem = ({
    icon,
    dest,
    title = dest,
  }: MenuItem): ReactElement<MenuItemProps> => (
    <DrawerItem
      key={icon}
      accessoryLeft={(props) => <Icon name={icon} {...props} />}
      title={title}
      onPress={() => onPressItem(dest)}
    />
  );

  const drawerItems = [
    ...items.map(renderItem),
    <DrawerGroup
      key="more"
      title="More"
      accessoryLeft={(props) => <Icon name={IconsOutlined.menu} {...props} />}
    >
      {more.map(renderItem)}
    </DrawerGroup>,
  ];

  return (
    <Drawer
      style={style}
      ListHeaderComponent={
        <View style={styles.sectionContainer}>
          <Text h1>{MyConstants.expoConfig?.name}</Text>
          <View style={styles.connected}>
            <Badge
              label={`${client ? '' : 'Not '}Connected to Supabase`}
              status={client ? 'success' : 'danger'}
              onPress={() => showConnectionSettings()}
              size="small"
            />
          </View>
        </View>
      }
    >
      {drawerItems}
    </Drawer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: { paddingHorizontal: Spacings.s4 },
  connected: {
    paddingHorizontal: Spacings.s4,
    paddingTop: Spacings.s2,
    paddingBottom: Spacings.s1,
  },
});
