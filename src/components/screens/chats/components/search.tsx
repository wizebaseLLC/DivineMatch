/* eslint-disable no-nested-ternary */
import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ThemeContext } from 'styled-components';
import { isAndroid, isIos } from '../../../../library/platform';

export default function Search() {
  const [search, setSearch] = useState('');
  const theme = useContext(ThemeContext);

  const updateSearch = (value: string) => {
    setSearch(value);
  };
  return (
    <View style={{ paddingBottom: theme.spacing }}>
      <SearchBar
        placeholder="Search..."
        onChangeText={updateSearch}
        platform={isIos ? 'ios' : isAndroid ? 'android' : 'default'}
        value={search}
      />
    </View>
  );
}
