/* eslint-disable react/destructuring-assignment */
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MatchesScreen } from '../screens/matches';
import { ChatScreen } from '../screens/chat';
import { DispayProfile } from '../screens/profile';
import Home from '../screens/home';
import ActivityScreen from '../screens/activity';

import { darkTheme as styledDarkTheme } from './theme';

const Tab = createBottomTabNavigator();
const TabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      tabBarOptions={{
        activeTintColor: styledDarkTheme.colors.secondary,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={Home}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: props => (
            <FontAwesome5
              name="kiss-wink-heart"
              {...props}
              solid={!!props.focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={ActivityScreen}
        options={{
          tabBarLabel: 'Activity',
          tabBarIcon: props => (
            <FontAwesome5 name="fire" {...props} solid={!!props.focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Matches"
        component={MatchesScreen}
        options={{
          tabBarLabel: 'Matches',
          tabBarIcon: props => (
            <FontAwesome5 name="heart" {...props} solid={!!props.focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: props => (
            <FontAwesome5 name="comment" {...props} solid={!!props.focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={DispayProfile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: props => (
            <FontAwesome5 name="user" {...props} solid={!!props.focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabScreen;
