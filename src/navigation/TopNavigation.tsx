import { DrawerActions } from '@react-navigation/native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import {
  Divider,
  TopNavigation as UIKTopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { RenderProp } from '@ui-kitten/components/devsupport';
import { Fragment, ReactNode } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Anchor, Icon, Text, View } from '../components/base';
import {
  Icons,
  isValidParam,
  MyConstants,
  RootStackParamList,
  Spacings,
} from '../utils';

const getGHUrl = (route: keyof RootStackParamList): string => {
  let dir: string;
  switch (route) {
    case 'About':
    case 'App':
    case 'Feedback':
    case 'Help':
      dir = 'about';
      break;
    case 'Home':
    case 'HomeEdit':
      dir = 'home';
      break;
    case 'Queries':
    case 'QueryEdit':
      dir = 'queries';
      break;
  }
  return `${MyConstants.githubUrl}/blob/master/src/screens/${dir}/${route}Screen.tsx`;
};

export default <T extends NativeStackHeaderProps>(topInsets: number) =>
  ({ options, navigation, route, ...others }: T) => {
    if (options.headerShown === false) {
      return undefined;
    }

    let BackAction: RenderProp = () => (
      <TopNavigationAction
        icon={(props) => <Icon {...props} name={Icons.menu} />}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
    );

    let canGoBack = false;
    const back = 'back';
    if ('pop' in navigation && isValidParam(back, others) && others[back]) {
      const goBack = () => navigation.pop();
      canGoBack = false;

      BackAction = () => (
        <TopNavigationAction
          icon={(props) => <Icon {...props} name={Icons.arrowBack} />}
          onPress={goBack}
        />
      );
    }

    const { title, headerRight } = options || {};

    const renderRightActions = () => {
      const headerActions: ReactNode[] = [];

      if (headerRight) {
        headerActions.push(
          <Fragment key="action">{headerRight({ canGoBack })}</Fragment>
        );
      }

      if (Platform.OS === 'web') {
        headerActions.push(
          <View center key="gh">
            <Anchor
              url={getGHUrl(route.name as keyof RootStackParamList)}
              text="GitHub"
              showIcon
              style={styles.ghUrl}
              status="basic"
            />
          </View>
        );
      }

      return <View row>{headerActions}</View>;
    };

    return (
      <>
        <UIKTopNavigation
          style={{ paddingTop: topInsets }}
          title={(props) => (
            <Text {...props} style={[props?.style, { marginTop: topInsets }]}>
              {title || route.name}
            </Text>
          )}
          alignment="center"
          accessoryLeft={BackAction}
          accessoryRight={renderRightActions}
        />
        <Divider />
      </>
    );
  };

const styles = StyleSheet.create({ ghUrl: { marginHorizontal: Spacings.s4 } });
