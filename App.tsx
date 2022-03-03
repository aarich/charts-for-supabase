import { CustomSchemaType } from '@eva-design/dss';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-url-polyfill/auto';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import theme from './assets/theme.json';
import mapping from './src/components/base/mapping.json';
import Navigation from './src/navigation';
import { persistor, store } from './src/redux/store';
import { handleError, log } from './src/utils';
import { useIsDark } from './src/utils/hooks';
import AlertProvider from './src/utils/providers/AlertProvider';
import ConnectionSettingsProvider from './src/utils/providers/ConnectionSettingsProvider';
import PromptProvider from './src/utils/providers/PromptProvider';
import ToastProvider from './src/utils/providers/ToastProvider';

// @ts-expect-error partial mappings allowed
const customMapping = mapping as CustomSchemaType;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2, cacheTime: 0 }, //20 * 60 * 1000 },
    mutations: { onError: (error) => handleError(error) },
  },
});

setLogger({ log, warn: log, error: log });

export default function App() {
  const isDark = useIsDark();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IconRegistry icons={EvaIconsPack} />
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <ApplicationProvider
          {...eva}
          theme={{ ...(isDark ? eva.dark : eva.light), ...theme }}
          customMapping={customMapping}
        >
          <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
              <AlertProvider>
                <PromptProvider>
                  <ToastProvider>
                    <ConnectionSettingsProvider>
                      <Navigation />
                    </ConnectionSettingsProvider>
                  </ToastProvider>
                </PromptProvider>
              </AlertProvider>
            </SafeAreaProvider>
          </QueryClientProvider>
        </ApplicationProvider>
      </PersistGate>
    </Provider>
  );
}
