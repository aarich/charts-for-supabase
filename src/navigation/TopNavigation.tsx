import { DrawerActions } from '@react-navigation/native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import {
  Divider,
  TopNavigation as UIKTopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { RenderProp } from '@ui-kitten/components/devsupport';
import { Fragment, ReactNode } from 'react';
import { Icon, Text, View } from '../components/base';
import { Icons, isValidParam } from '../utils';

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
      canGoBack = true;

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
