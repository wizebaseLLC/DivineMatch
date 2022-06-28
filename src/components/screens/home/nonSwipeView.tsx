import React from 'react';
import { View } from 'react-native';
import { Profile } from '../profile';

const NonSwipeView = () => {
  return (
    <View style={{ flex: 1 }}>
      <Profile isNotMyProfile />
    </View>
  );
};
export default NonSwipeView;
