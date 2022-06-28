/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { isIos, isAndroid } from '../../../library/platform';

const SearchActivity = () => {
  const [search, setSearch] = useState('');

  const updateSearch = (value: string) => {
    setSearch(value);
  };
  return (
    <View style={{ paddingBottom: 8 }}>
      <SearchBar
        placeholder="Search..."
        onChangeText={updateSearch}
        platform={isIos ? 'ios' : isAndroid ? 'android' : 'default'}
        value={search}
      />
    </View>
  );
};
export default SearchActivity;
