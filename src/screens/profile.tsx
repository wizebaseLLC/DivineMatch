/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import {
  EditProfile,
  Profile,
  UpdateField,
  UpdateImages,
} from '../components/screens/profile';
import { RootStackParamList } from '../library/navigator';
import { SearchScreen } from '../components/screens/search';
import { NotificationsScreen } from '../components/screens/notifications';
import SearchingBar from '../components/screens/search/searchBar';
import { SettingsScreen } from '../components/screens/settings';

const Stack = createStackNavigator<RootStackParamList>();

export type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;
export type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

export type UpdateFieldScreenRouteProp = RouteProp<
  RootStackParamList,
  'UpdateField'
>;
export type UpdateFieldScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UpdateField'
>;

export const DispayProfile = () => {
  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName="Profile"
      screenOptions={{
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: 'EditProfile',
          headerTitle: 'Edit Profile',
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
        name="UpdateImages"
        component={UpdateImages}
        options={{
          title: 'UpdateImages',
          headerTitle: 'Update Images',
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
        name="UpdateField"
        component={UpdateField}
        options={props => ({
          title: 'UpdateField',
          headerStyle: {
            shadowRadius: 0,
            height: 120,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: props.route.params?.displayName,
        })}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
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
