/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo } from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';

import { ThemeProvider } from 'react-native-elements';

import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';
import { ToastProvider } from 'react-native-styled-toast';
import { useColorScheme, View } from 'react-native';

import { Maybe } from 'graphql/jsutils/Maybe';
import {
  theme as styledLightTheme,
  darkTheme as styledDarkTheme,
} from './theme';

import useCreateElementsTheme from './useCreateElementsTheme';

import {
  ConfirmSignUp,
  ForgotPassword,
  Login,
  SignUp,
} from '../components/screens/login';
import { InitialWizard } from '../components/screens/initialWizard';
import { UpdateFieldProps } from '../components/screens/profile/components/editProfile/editProfile';
import useAwsAuth from './api/hooks/useAwsAuth';
import {
  PostMedia,
  useMyProfileQuery,
  UserLimitedFields,
  useUpdateUserTimeStampMutation,
} from '../generated/generated';
import { PressItemType } from '../components/screens/activity/actionButton';
import TabScreen from './tabScreen';
import UiCameraVideo from './ui/camera/cameraVideo';
import { Mood } from '../components/screens/activity/bottomSheetActions/flair';

export type RootStackParamList = {
  MoreMatches: { title: string }; // for View More page in Matches Tab
  Home: undefined;
  Matches: undefined;
  Chat: { id: string; avatar: string }; // userId of person you chat with
  Settings: undefined;
  Notifications: undefined;
  Search: undefined;
  Login: undefined;
  SignUp: undefined;
  Profile: {
    firstName: string;
    location: string;
    images: string[];
  };
  EditProfile: undefined;
  UpdateImages: undefined;
  UpdateField: UpdateFieldProps;
  ViewUser: { id: string };
  NewDivineMatch: { user: UserLimitedFields };
  InitialWizard: undefined;
  Activity: undefined;
  ConfirmSignUp: { email: string; password: string };
  ForgotPassword: undefined;
  PostModal: {
    id: PressItemType;
    message?: string;
    media?: { uri: string; type: 'image' | 'video' } | null;
    tags?: { id: string; name: string; profilepic: string }[];
    flair?: Mood;
  };
  CameraWithVideo: undefined;
  ImageView: {
    id: string;
    userId: string;
    body: Maybe<string> | undefined;
    videoPlaying: string;
    media: PostMedia;
  };
};

const Stack = createStackNavigator();
const AuthStack = createStackNavigator<RootStackParamList>();

const InitialWizardStack = createStackNavigator<RootStackParamList>();

const CameraWithVideo = () => (
  <View style={{ flex: 1 }}>
    <UiCameraVideo allowsVideo />
  </View>
);

export const Navigator = () => {
  const scheme = useColorScheme();
  const isDark = useMemo(() => scheme === 'dark', [scheme]);
  const { isAuthenticated, authenticatedUser } = useAwsAuth();
  const { data: me, loading, error } = useMyProfileQuery();
  const [updateTimeStamp] = useUpdateUserTimeStampMutation();

  console.log({ me, isAuthenticated, authenticatedUser });
  useEffect(() => {
    if (me?.myProfile?.id)
      updateTimeStamp({ variables: { id: me?.myProfile?.id } });
  }, [me, updateTimeStamp]);

  const theme = useCreateElementsTheme();
  const navDarkTheme: typeof DarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      card: 'rgb(26,26,28)',
    },
  };

  if ((loading || !scheme) && !error) return null;
  return (
    <NavigationContainer theme={isDark ? navDarkTheme : DefaultTheme}>
      <StyledComponentsThemeProvider
        theme={isDark ? styledDarkTheme : styledLightTheme}
      >
        <AppearanceProvider>
          <ThemeProvider theme={theme} useDark={isDark}>
            <ToastProvider offset={16}>
              {isAuthenticated && !loading && !me?.myProfile?.id && !error ? (
                <InitialWizardStack.Navigator
                  initialRouteName="InitialWizard"
                  screenOptions={{
                    headerShown: false,
                  }}
                >
                  <InitialWizardStack.Screen
                    name="InitialWizard"
                    component={InitialWizard}
                  />
                </InitialWizardStack.Navigator>
              ) : !isAuthenticated || error ? (
                <AuthStack.Navigator
                  initialRouteName="Login"
                  screenOptions={{
                    headerShown: false,
                  }}
                >
                  <AuthStack.Screen name="Login" component={Login} />
                  <AuthStack.Screen name="SignUp" component={SignUp} />
                  <AuthStack.Screen
                    name="ConfirmSignUp"
                    component={ConfirmSignUp}
                    options={{
                      headerShown: true,
                      headerTransparent: true,
                      headerTitle: '',
                      headerTintColor: 'black',
                    }}
                  />
                  <AuthStack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                    options={{
                      headerShown: true,
                      headerTransparent: true,
                      headerTitle: '',
                      headerTintColor: 'black',
                    }}
                  />
                </AuthStack.Navigator>
              ) : me?.myProfile?.id ? (
                <Stack.Navigator mode="modal">
                  <Stack.Screen
                    name="Tabs"
                    options={{ headerShown: false }}
                    component={TabScreen}
                  />
                  <Stack.Screen
                    name="CameraWithVideo"
                    component={CameraWithVideo}
                    options={{ headerShown: false }}
                  />
                </Stack.Navigator>
              ) : null}
            </ToastProvider>
          </ThemeProvider>
        </AppearanceProvider>
      </StyledComponentsThemeProvider>
    </NavigationContainer>
  );
};
