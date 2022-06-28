import React, { useContext, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ThemeContext } from 'styled-components';
import { isAndroid, isIos } from '../../../library/platform';

const { width } = Dimensions.get('window');

export default function SearchingBar() {
  const [search, setSearch] = useState('');

  const updateSearch = (value: string) => {
    setSearch(value);
  };

  const theme = useContext(ThemeContext);
  return (
    <View style={{ width: width * 0.85 }}>
      <SearchBar
        placeholder="Search..."
        onChangeText={updateSearch}
        containerStyle={{ backgroundColor: theme.colors.paper }}
        // eslint-disable-next-line no-nested-ternary
        platform={isIos ? 'ios' : isAndroid ? 'android' : 'default'}
        value={search}
      />
    </View>
  );
}
