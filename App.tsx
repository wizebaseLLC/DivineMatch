/* eslint-disable camelcase */
import 'react-native-gesture-handler';
import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import {
  useFonts,
  Nunito_700Bold,
  Nunito_400Regular,
  Nunito_800ExtraBold,
  Nunito_300Light,
} from '@expo-google-fonts/nunito';
import {
  Raleway_500Medium,
  Raleway_700Bold,
  Raleway_700Bold_Italic,
} from '@expo-google-fonts/raleway';
import Amplify from 'aws-amplify';
import { Linking, Platform } from 'react-native';
import { Audio } from 'expo-av';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { Navigator } from './src/library/navigator';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import config from './aws-exports';
import { ApolloWrapper } from './src/library/apollo';
import store from './src/reduxStore';
// eslint-disable-next-line consistent-return
async function urlOpener(url: string, redirectUrl: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
    url,
    redirectUrl,
  );

  if (type === 'success' && Platform.OS === 'ios') {
    WebBrowser.dismissBrowser();
    return Linking.openURL(newUrl);
  }
}

Amplify.configure({
  ...config,
  oauth: {
    ...config.oauth,
    urlOpener,
  },
});

function App() {
  const [fontsLoaded] = useFonts({
    Raleway: Raleway_500Medium,
    RalewayBold: Raleway_700Bold,
    RalewayBoldItalic: Raleway_700Bold_Italic,
    Heading: Nunito_800ExtraBold,
    SubHeading: Nunito_700Bold,
    Light: Nunito_300Light,
    Normal: Nunito_400Regular,
  });

  Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ApolloWrapper>
          <ActionSheetProvider>
            <Navigator />
          </ActionSheetProvider>
        </ApolloWrapper>
      </SafeAreaProvider>
    </Provider>
  );
}
export default App;
