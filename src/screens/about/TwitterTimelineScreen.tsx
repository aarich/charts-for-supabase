import { canOpenURL, openURL } from 'expo-linking';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import TwitterTimeline from '../../components/about/TwitterTimeline';
import { HeaderButton } from '../../components/base';
import {
  alert,
  handleError,
  IconsOutlined,
  RootStackScreenProps,
} from '../../utils';
import { useIsDark } from '../../utils/hooks';

export const TWITTER_PROFILE = 'mr_arich';

const profileUrl = 'https://twitter.com/' + TWITTER_PROFILE;

const urlParam = encodeURIComponent(profileUrl);

export const openTwitter = () => {
  if (Platform.OS === 'web') {
    window.open(profileUrl, '_blank');
  } else {
    canOpenURL('twitter://').then((canOpen) =>
      openURL(
        canOpen ? 'twitter://user?screen_name=' + TWITTER_PROFILE : profileUrl
      )
    );
  }
};

type Props = RootStackScreenProps<'Twitter'>;

const TwitterTimelineScreen = ({ navigation }: Props) => {
  const [loadNum, setLoadNum] = useState(0);
  const [embedHtml, setEmbedHtml] = useState<string>();
  const [loading, setLoading] = useState(true);

  const isDark = useIsDark();
  const themeParam = isDark ? 'theme=dark&' : '';
  const timelineURL = `https://publish.twitter.com/oembed?${themeParam}url=${urlParam}`;

  useEffect(() => {
    if (loadNum < 2) {
      fetch(timelineURL, { method: 'GET' })
        .then((resp) => resp.json())
        .then((json) => setEmbedHtml(json.html))
        .catch(handleError)
        .finally(() => setLoadNum((old) => old + 1));
    } else {
      setLoading(false);
    }
  }, [loadNum, timelineURL]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          icon={IconsOutlined.radio}
          onPress={() =>
            alert(
              'Send a tweet',
              'A great, free way to support us is to mention us on Twitter. Let us know how you use the app!',
              [{ text: 'Go to Twitter', onPress: openTwitter }]
            )
          }
        />
      ),
    });
  }, [navigation]);

  return <TwitterTimeline embedHtml={embedHtml} loading={loading} />;
};

export default TwitterTimelineScreen;
