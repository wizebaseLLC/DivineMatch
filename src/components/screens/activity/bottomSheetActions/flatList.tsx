import React from 'react';
import { View } from 'react-native';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import List, { ListProps } from './list';

interface SearchFlatListProps {
  item: ListProps;
}

const SearchFlatList: React.FC<{ data: ListProps[] }> = ({ data }) => {
  const [refresh, setRefresh] = React.useState(false);

  const onRefresh = () => {
    setRefresh(true);
    setRefresh(false);
  };

  const keyExtractor = (_: ListProps, index: number) => index.toString();

  const renderItem = ({ item }: SearchFlatListProps) => <List {...item} />;
  return (
    <View style={{ flex: 1 }}>
      <BottomSheetFlatList
        refreshing={refresh}
        onRefresh={onRefresh}
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

export default SearchFlatList;
