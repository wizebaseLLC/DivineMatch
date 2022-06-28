/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useContext } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ThemeContext } from 'styled-components';
import { RouteProp } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { Dimensions } from 'react-native';
import {
  NonSwipeView,
  Swiper,
  NewDivineMatch,
} from '../components/screens/home';
import StackTitle from '../library/stackTitle';
import { RootStackParamList } from '../library/navigator';
import { useListPostQuery } from '../generated/generated';

const Stack = createSharedElementStackNavigator<RootStackParamList>();
const { height } = Dimensions.get('window');

export type ViewUserScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ViewUser'
>;

export type NewDivineMatchScreenRouteProp = RouteProp<
  RootStackParamList,
  'NewDivineMatch'
>;

export type ViewUserScreenRouteProp = RouteProp<RootStackParamList, 'ViewUser'>;

const Home = () => {
  const theme = useContext(ThemeContext);
  useListPostQuery();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        cardOverlayEnabled: true,
        gestureEnabled: false,
        cardStyle: { backgroundColor: 'transparent' },
      }}
      mode="modal"
    >
      <Stack.Screen
        name="Home"
        component={Swiper}
        options={{
          title: '',
          headerTransparent: true,
          headerStyle: {
            backgroundColor: theme.colors.primary,
            shadowRadius: 0,
            height: 120,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },

          headerLeft: () => <StackTitle title="Discover" />,
        }}
      />
      <Stack.Screen
        name="NewDivineMatch"
        component={NewDivineMatch}
        options={{
          title: '',
          headerTransparent: true,
          headerStyle: {
            backgroundColor: theme.colors.primary,
            shadowRadius: 0,
            height: 120,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => null,
          headerTitle: () =>
            height < 812 ? null : (
              <StackTitle large title="Congratulations 🎉" noImage />
            ),
        }}
      />
      <Stack.Screen
        name="ViewUser"
        component={NonSwipeView}
        sharedElements={route => [{ id: route.params.id }]}
        options={{
          headerShown: true,
          title: '',
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};
export default Home;
