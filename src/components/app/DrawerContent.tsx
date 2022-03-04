import {
  Drawer,
  DrawerGroup,
  DrawerItem,
  MenuItemProps,
} from '@ui-kitten/components';
import { setString } from 'expo-clipboard';
import { ReactElement } from 'react';
import { Platform, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import connection from '../../api/database';
import { openTwitter } from '../../screens/about/TwitterTimelineScreen';
import {
  alert,
  IconsOutlined,
  IconType,
  MyConstants,
  RootStackParamList,
  showConnectionSettings,
  Spacings,
  toast,
} from '../../utils';
import { Badge, Icon, Text, View } from '../base';

type Props = {
  onGoToScreen: (name: keyof RootStackParamList) => void;
  onToggleDrawer: VoidFunction;
  onResetApp: VoidFunction;
  style?: StyleProp<ViewStyle>;
};

const CONNECTION = 'Edit Connection';
const RESET = 'Reset App';

type MenuItem = {
  icon: IconType;
  title?: string;
  dest: keyof RootStackParamList | typeof CONNECTION | typeof RESET;
};

const items: MenuItem[] = [
  { icon: IconsOutlined.globe, dest: 'Queries' },
  { icon: IconsOutlined.grid, title: 'Customize Dashboard', dest: 'HomeEdit' },
  { icon: IconsOutlined.book, dest: 'Help' },
];

const more: MenuItem[] = [
  { icon: IconsOutlined.info, dest: 'About' },
  { icon: IconsOutlined.bulb, dest: 'Feedback' },
  { icon: IconsOutlined.twitter, title: 'Updates', dest: 'Twitter' },
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
      case CONNECTION:
        showConnectionSettings();
        onToggleDrawer();
        break;
      case RESET:
        onToggleDrawer();
        onResetApp();
        break;
      default:
        if (Platform.OS === 'web' && dest === 'Twitter') {
          openTwitter();
        } else {
          onGoToScreen(dest);
        }
        break;
    }
  };

  const client = connection.get();
  const user = client?.user;

  const onPressConnection = () => {
    const edit = {
      text: 'Edit Connection',
      onPress: () => onPressItem(CONNECTION),
    };
    if (user) {
      alert('', `Logged in as ${user.email}\n${user.id}`, [
        {
          text: 'Copy User Id',
          onPress: () => {
            setString(user.id);
            toast('Copied!');
          },
        },
        edit,
      ]);
    } else {
      alert('', client ? 'Not logged in as a user' : 'Not connected', [edit]);
    }
  };

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
          <Text h1>{MyConstants.manifest?.name}</Text>
          <View style={styles.connected}>
            <Badge
              label={`${client ? '' : 'Not '} Connected to Supabase`}
              status={client ? 'success' : 'danger'}
              onPress={onPressConnection}
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
