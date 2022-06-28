import React, { useContext, useState } from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { ThemeContext } from 'styled-components';
import { Button, Icon } from 'react-native-elements';
import { replaceMentionValues } from 'react-native-controlled-mentions';
// @ts-ignore
import uuid from 'react-uuid';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { Activity } from '../components/screens/activity';
import NotificationsIcon from '../library/notifications';
import SearchIcon from '../library/search';
import { SearchScreen } from '../components/screens/search';
import { NotificationsScreen } from '../components/screens/notifications';
import SearchingBar from '../components/screens/search/searchBar';
import StackTitle from '../library/stackTitle';
import { RootStackParamList } from '../library/navigator';
import BottomSheetSwitch from '../components/screens/activity/bottomSheetActions/switch';
import {
  Maybe,
  PostMediaInput,
  useCreatePostMutation,
  useMyProfileQuery,
  ListPostDocument,
} from '../generated/generated';
import { uploadStorage } from '../library/api/uploadStorage';
import { IMAGE_PREFIX } from '../library/globalConstants';
import { NonSwipeView } from '../components/screens/home';
import ImageView from '../components/screens/activity/fullScreenImageView/imageView';

const RootStack = createSharedElementStackNavigator<RootStackParamList>();
const Stack = createStackNavigator<RootStackParamList>();

export type PostModalScreenRouteProp = RouteProp<
  RootStackParamList,
  'PostModal'
>;

export type PostModalNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PostModal'
>;

export type ViewActivityImageScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ImageView'
>;

export type ViewActivityImageScreenRouteProp = RouteProp<
  RootStackParamList,
  'ImageView'
>;

const MainScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Activity"
      screenOptions={{
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="Activity"
        component={Activity}
        options={{
          title: '',
          headerStyle: {
            shadowRadius: 0,
            height: 120,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: ops => (
            <View style={{ flexDirection: 'row' }}>
              <SearchIcon {...{ ops }} />
              <NotificationsIcon {...{ ops }} />
            </View>
          ),
          headerLeft: () => <StackTitle noColor title="Activity" />,
        }}
      />

      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          title: 'Notifications',
          headerStyle: {
            shadowRadius: 0,
            height: 120,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerTitle: () => <SearchingBar />,
          headerBackTitle: ' ',
          headerStyle: {
            shadowRadius: 0,
            height: 120,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="ViewUser"
        component={NonSwipeView}
        options={{
          headerShown: true,
          title: '',
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

const ActivityScreen = () => {
  const theme = useContext(ThemeContext);
  const [createPost, { error }] = useCreatePostMutation();
  const [isPosting, setIsPosting] = useState(false);

  if (error) console.error(error);
  const { data: me } = useMyProfileQuery();
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Activity"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="ImageView"
        component={ImageView}
        options={{
          headerShown: true,
          title: '',
          headerTransparent: true,
        }}
      />
      <RootStack.Screen
        name="ViewUser"
        component={NonSwipeView}
        sharedElements={route => [{ id: route.params.id }]}
        options={{
          headerShown: true,
          title: '',
          headerTransparent: true,
        }}
      />
      <RootStack.Screen
        name="PostModal"
        component={BottomSheetSwitch}
        options={nav => ({
          headerStyle: {
            backgroundColor: theme.colors.background,
            height: 100,
          },
          title: 'Create Post',
          headerRight: () => (
            <View style={{ justifyContent: 'center' }}>
              <Button
                title="Post"
                icon={
                  isPosting ? (
                    <ActivityIndicator
                      color={theme.colors.actionBlue}
                      style={{ marginLeft: theme.spacing / 2 }}
                    />
                  ) : undefined
                }
                iconRight
                containerStyle={{
                  marginRight: theme.spacing * 2,
                  width: 70,
                }}
                titleStyle={{
                  fontSize: 14,
                  fontFamily: theme.font.subHeading,
                }}
                disabled={
                  (!nav.route.params.message && !nav.route.params.media) ||
                  isPosting
                }
                onPress={async () => {
                  setIsPosting(true);
                  const mentions: Array<string> = [];
                  const hashtags: Array<string> = [];

                  replaceMentionValues(nav.route.params.message || '', p => {
                    if (p.trigger === '@') {
                      mentions.push(p.id);
                    } else if (p.trigger === '#') {
                      hashtags.push(p.id);
                    }

                    return p.id;
                  });

                  const media = nav.route.params.media?.uri
                    ? (async () => {
                        const mediaMap = {
                          mediaType: nav.route.params?.media?.type,
                          uri: nav.route.params?.media?.uri,
                        } as Maybe<PostMediaInput> | undefined;

                        const ref = `userImages/${
                          me?.myProfile?.email as string
                        }/gallery${uuid()}`;

                        await uploadStorage({
                          ref,
                          uri: mediaMap?.uri as string,
                          mediaType:
                            mediaMap?.mediaType === 'video'
                              ? 'video'
                              : undefined,
                        });

                        return {
                          uri: `${IMAGE_PREFIX}/${ref}`,
                          mediaType: mediaMap?.mediaType,
                        } as Maybe<PostMediaInput>;
                      })()
                    : undefined;

                  await createPost({
                    variables: {
                      input: {
                        active: true,
                        userId: me?.myProfile?.id as string,
                        body: nav.route.params?.message || '',
                        flair: nav.route.params?.flair?.emoji,
                        flairText: nav.route.params?.flair?.name,
                        hashtags,
                        media: await media,
                        tags: mentions,
                      },
                    },
                    refetchQueries: [{ query: ListPostDocument }],
                  });
                  setIsPosting(false);
                  nav.navigation.goBack();
                }}
              />
            </View>
          ),
          headerLeft: () => {
            return (
              <Button
                type="clear"
                onPress={() => {
                  nav.navigation.goBack();
                }}
                containerStyle={{ width: 60 }}
                icon={<Icon name="times" type="font-awesome-5" />}
              />
            );
          },
        })}
      />
    </RootStack.Navigator>
  );
};

export default ActivityScreen;
