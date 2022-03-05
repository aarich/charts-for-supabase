import { openURL } from 'expo-linking';
import * as StoreReview from 'expo-store-review';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import FeedbackContainer from '../../containers/about/FeedbackContainer';
import { setAppSetting } from '../../redux/actions';
import { useSetting } from '../../redux/selectors';
import { useAppDispatch } from '../../redux/store';
import {
  AppSetting,
  Icons,
  IconType,
  log,
  MyConstants,
  openTwitter,
  TWITTER_PROFILE,
} from '../../utils';

const FeedbackScreen = () => {
  const hasRequestedReview = useSetting(AppSetting.HAS_REQUESTED_REVIEW);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (hasRequestedReview) {
      return;
    }

    StoreReview.isAvailableAsync()
      .then((available) => {
        if (available) {
          StoreReview.requestReview().finally(() =>
            dispatch(setAppSetting({ [AppSetting.HAS_REQUESTED_REVIEW]: true }))
          );
        }
      })
      .catch(log);
  }, [dispatch, hasRequestedReview]);

  const buttons: { title: string; icon: IconType; onPress: () => void }[] = [];

  const storeUrl = Platform.select({
    default: MyConstants.appStoreUrl,
    android: MyConstants.playStoreUrl,
  });
  const app = Platform.select({ default: 'App', android: 'Play' });

  buttons.push({
    title: `Open in the ${app} Store`,
    icon: Platform.select({ android: Icons.google, default: Icons.bulb }),
    onPress: () => openURL(storeUrl),
  });

  buttons.push({
    title: 'Send Bug Report',
    icon: Icons.github,
    onPress: () => openURL(`${MyConstants.githubUrl}/issues/new/choose`),
  });

  buttons.push({
    title: `Visit @${TWITTER_PROFILE}`,
    icon: Icons.twitter,
    onPress: openTwitter,
  });

  return <FeedbackContainer buttons={buttons} />;
};

export default FeedbackScreen;
