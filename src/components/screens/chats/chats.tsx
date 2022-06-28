import React, { useContext } from 'react';
import { View } from 'react-native';
import { ThemeContext } from 'styled-components';
import SearchActivity from './components/search';
import ChatList from './components/chatList';

export default function Chats() {
  const theme = useContext(ThemeContext);
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.paper }}>
      <SearchActivity />
      <ChatList />
    </View>
  );
}
