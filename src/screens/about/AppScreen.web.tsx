import { useLinkTo } from '@react-navigation/native';
import { openURL } from 'expo-linking';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Anchor, Layout, Text, View } from '../../components/base';
import { MAX_WEB_WIDTH } from '../../components/base/Screen';
import { MyConstants, Spacings } from '../../utils';

export default () => {
  const linkTo = useLinkTo();
  const screenWidth = Math.min(MAX_WEB_WIDTH, useWindowDimensions().width);
  const isMobile = screenWidth < 760;

  const imageWidth = 1242;
  const imageHeight = 2688;

  const width = isMobile ? screenWidth * 0.9 : screenWidth / 4.5;
  const height = (imageHeight * width) / imageWidth;
  const imageStyle = { width, height, margin: Spacings.s1 };

  const buttonWidth = 167;
  const buttonHeight = 50;
  const buttonStyle = {
    width: buttonWidth,
    height: buttonHeight,
    margin: Spacings.s2,
  };

  const screenshots = {
    Home: require('../../../screenshots/12 Home.png'),
    Query: require('../../../screenshots/12 Query.png'),
    Edit: require('../../../screenshots/12 Edit.png'),
  };

  const renderScreenshots = () => (
    <View row style={styles.screenshots} center>
      {['Home', 'Query', 'Edit'].map((n) => (
        <Image
          key={n}
          source={screenshots[n as keyof typeof screenshots]}
          style={imageStyle}
        />
      ))}
    </View>
  );

  const renderButtons = () => (
    <View row center>
      <Pressable onPress={() => openURL(MyConstants.appStoreUrl)}>
        <Image
          source={require('../../../assets/images/downloadOnAppStore.png')}
          accessibilityLabel="Download on the app store"
          style={buttonStyle}
        />
      </Pressable>

      <Pressable onPress={() => openURL(MyConstants.playStoreUrl)}>
        <Image
          source={require('../../../assets/images/getItOnGooglePlay.png')}
          accessibilityLabel="Get it on Google Play"
          style={buttonStyle}
        />
      </Pressable>
    </View>
  );

  return (
    <Layout l2 flex style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text h1 center>
          {MyConstants.expoConfig?.name}
        </Text>
        <Text category="h6" center>
          Custom Analytics Client for Supabase
        </Text>
        <Text center style={styles.browse}>
          <Anchor onPress={() => linkTo('/home')} text="Get started" />
        </Text>

        {isMobile ? renderButtons() : renderScreenshots()}
        {isMobile ? renderScreenshots() : renderButtons()}

        <Text center style={styles.browse}>
          <Anchor
            onPress={() =>
              openURL(`${MyConstants.githubUrl}/issues/new/choose`)
            }
            text="Contact"
          />
        </Text>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  browse: { padding: Spacings.s3 },
  container: { padding: Spacings.s3 },
  scroll: { flex: 1 },
  screenshots: { flexWrap: 'wrap' },
});
