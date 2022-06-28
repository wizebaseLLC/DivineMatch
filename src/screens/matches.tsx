/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { View } from 'react-native';
import { RootStackParamList } from '../library/navigator';
import { theme } from '../library/theme';
import { Matches } from '../components/screens/matches';
import { ViewMoreMatches } from '../components/screens/matches/viewMore';
import NotificationsIcon from '../library/notifications';
import SearchIcon from '../library/search';
import { SearchScreen } from '../components/screens/search';
import { NotificationsScreen } from '../components/screens/notifications';
import SearchingBar from '../components/screens/search/searchBar';
import StackTitle from '../library/stackTitle';

const Stack = createStackNavigator<RootStackParamList>();

export type MatchesScreenRouteProp = RouteProp<
  RootStackParamList,
  'MoreMatches'
>;
export type MatchesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MoreMatches'
>;

export const MatchesScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Matches"
      screenOptions={{
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="Matches"
        component={Matches}
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
          headerLeft: () => <StackTitle noColor title="Matches" />,
        }}
      />
      <Stack.Screen
        name="MoreMatches"
        component={ViewMoreMatches}
        options={navi => ({
          title: navi.route.params.title,
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
          headerRight: () => <View style={{ flexDirection: 'row' }} />,
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
