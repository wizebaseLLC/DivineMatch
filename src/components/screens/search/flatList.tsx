import React from 'react';
import { View, FlatList } from 'react-native';
import List, { ListProps } from './list';

interface SearchFlatListProps {
  item: ListProps;
}

const list: ListProps[] = new Array(20).fill({
  name: 'Amy Farha',
  avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  searchType: 'Friend',
});

const SearchFlatList = () => {
  const [refresh, setRefresh] = React.useState(false);

  const onRefresh = () => {
    setRefresh(true);
    setRefresh(false);
  };

  const keyExtractor = (_: ListProps, index: number) => index.toString();

  const renderItem = ({ item }: SearchFlatListProps) => <List {...item} />;
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

export default SearchFlatList;
