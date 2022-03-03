import { openURL } from 'expo-linking';
import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useIsDark } from '../../utils/hooks';
import { LoadingWrapper } from '../base';

type Props = {
  loading: boolean;
  embedHtml?: string;
};

const TwitterTimeline = ({ loading, embedHtml }: Props) => {
  const webviewRef = useRef<WebView>(null);
  const isDark = useIsDark();
  const backgroundColor = isDark ? 'background-color: black;' : '';

  return (
    <LoadingWrapper loading={loading} flex>
      {embedHtml ? (
        <WebView
          ref={webviewRef}
          onNavigationStateChange={({ url }) => {
            if (!url || url === 'about:blank') return;
            webviewRef.current?.stopLoading();
            openURL(url);
          }}
          source={{
            html: `<!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0 !important;padding: 0 !important;${backgroundColor}">
            ${embedHtml}
          </body>
        </html>`,
          }}
          style={styles.webview}
        />
      ) : null}
    </LoadingWrapper>
  );
};

export default TwitterTimeline;

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
});
