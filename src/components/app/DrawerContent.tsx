import { Drawer, DrawerItem } from '@ui-kitten/components';
import { setString } from 'expo-clipboard';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import connection from '../../api/database';
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
  onToggleDrawer: () => void;
  style?: StyleProp<ViewStyle>;
};

const CLOSE = 'Close';
const EDIT_CONNECTION = 'Edit Connection';

type MenuItem = {
  icon: IconType;
  title?: string;
  dest: keyof RootStackParamList | typeof CLOSE | typeof EDIT_CONNECTION;
};

const items: MenuItem[] = [
  { icon: IconsOutlined.barChart, title: 'Manage Queries', dest: 'Queries' },
  { icon: IconsOutlined.grid, title: 'Customize Dashboard', dest: 'HomeEdit' },
  { icon: IconsOutlined.activity, dest: EDIT_CONNECTION },
  { icon: IconsOutlined.settings, dest: 'Settings' },
  { icon: IconsOutlined.book, dest: 'Help' },
  { icon: IconsOutlined.info, dest: 'About' },
  { icon: IconsOutlined.close, dest: CLOSE },
];

export function DrawerContent({ onGoToScreen, onToggleDrawer, style }: Props) {
  const onPressItem = (dest: MenuItem['dest']) => {
    switch (dest) {
      case CLOSE:
        onToggleDrawer();
        break;
      case EDIT_CONNECTION:
        showConnectionSettings();
        onToggleDrawer();
        break;
      default:
        onGoToScreen(dest);
        break;
    }
  };

  const client = connection.get();
  const user = client?.user;

  const onPressConnection = () => {
    const edit = {
      text: 'Edit Connection',
      onPress: () => onPressItem(EDIT_CONNECTION),
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

  return (
    <Drawer
      style={style}
      ListHeaderComponent={
        <View style={styles.sectionContainer}>
          <Text h1>{MyConstants.manifest?.name}</Text>

          <View style={styles.connected}>
            <Badge
              label={`${client ? '' : 'Not '} Connected to Supabase`}
              status={client ? 'success' : 'warning'}
              onPress={onPressConnection}
            />
          </View>
        </View>
      }
    >
      {items.map(({ icon, dest, title = dest }) => (
        <DrawerItem
          key={title}
          accessoryLeft={(props) => <Icon name={icon} {...props} />}
          title={title}
          onPress={() => onPressItem(dest)}
        />
      ))}
    </Drawer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: Spacings.s4,
  },
  connected: { paddingHorizontal: Spacings.s4, paddingTop: Spacings.s2 },
});
