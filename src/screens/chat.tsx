/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Avatar, Text } from 'react-native-elements';
import { View } from 'react-native';
import { RootStackParamList } from '../library/navigator';
import { theme } from '../library/theme';
import { Chats } from '../components/screens/chats';
import InChat from '../components/screens/chats/inChat/inChat';
import NotificationsIcon from '../library/notifications';
import SearchIcon from '../library/search';
import { SearchScreen } from '../components/screens/search';
import { NotificationsScreen } from '../components/screens/notifications';
import SearchingBar from '../components/screens/search/searchBar';
import StackTitle from '../library/stackTitle';

const Stack = createStackNavigator<RootStackParamList>();

export type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;
export type ChatScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Chat'
>;

export const ChatScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Matches"
      screenOptions={{
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="Matches"
        component={Chats}
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
          headerLeft: () => <StackTitle noColor title="Messages" />,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={InChat}
        options={navi => ({
          headerTitle: () => (
            <View style={{ alignItems: 'center' }}>
              <Avatar
                rounded
                size="medium"
                source={{
                  uri: navi.route.params.avatar,
                }}
              />
              <Text
                style={{ fontFamily: theme.font.subHeading, paddingTop: 2 }}
              >
                {navi.route.params.id}
              </Text>
            </View>
          ),
          headerStyle: {
            shadowRadius: 0,
            height: 120,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: theme.font.heading,
            fontSize: 24,
          },
        })}
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
    </Stack.Navigator>
  );
};
