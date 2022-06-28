import React from 'react';
import { View } from 'react-native';
import NotificationFlatList from './flatList';

const Notifications = () => {
  return (
    <View style={{ flex: 1 }}>
      <NotificationFlatList />
    </View>
  );
};

export default Notifications;
