import React from 'react';
import { View, FlatList } from 'react-native';
import List, { ListProps } from './list';

interface NotificationFlatListProps {
  item: ListProps;
}
const list: ListProps[] = new Array(50).fill({
  name: 'Amy Farha',
  avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  message: 'sent you a message!',
  date: new Date(),
});

const NotificationFlatList = () => {
  const [refresh, setRefresh] = React.useState(false);

  const onRefresh = () => {
    setRefresh(true);
    setRefresh(false);
  };

  const keyExtractor = (_: ListProps, index: number) => index.toString();

  const renderItem = ({ item }: NotificationFlatListProps) => (
    <List {...item} />
  );
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        scrollEventThrottle={16}
        refreshing={refresh}
        onRefresh={onRefresh}
        keyExtractor={keyExtractor}
        data={list}
        renderItem={renderItem}
      />
    </View>
  );
};

export default NotificationFlatList;
