/* eslint-disable no-nested-ternary */
import React, { useContext, useMemo, useState } from 'react';
import { Grid, Row } from 'react-native-easy-grid';
import { SearchBar, Text } from 'react-native-elements';
import { ThemeContext } from 'styled-components';
import styled from 'styled-components/native';
import { useListUserByNameLazyQuery } from '../../../../generated/generated';
import { isIos, isAndroid } from '../../../../library/platform';
import SearchFlatList from './flatList';

export const HeaderText = styled(Text)`
  align-self: center;
  font-family: ${props => props.theme.font.RalewayBoldItalic};
  font-size: 16px;
`;

const Tag = () => {
  const [search, setSearch] = useState('');
  const theme = useContext(ThemeContext);
  const [
    setSuggestions,
    { data: serverSuggestions },
  ] = useListUserByNameLazyQuery();

  const updateSearch = (name: string) => {
    setSearch(name);
    if (name)
      setSuggestions({
        variables: { name },
      });
  };

  const data = useMemo(
    () =>
      serverSuggestions?.listUsersByName?.map(x => ({
        name: `${x?.firstname} ${x?.lastname}`,
        profilepic: x?.profilepic,
        id: x?.id,
      })),
    [serverSuggestions],
  );

  return (
    <>
      <HeaderText>Tag a friend</HeaderText>
      <SearchBar
        placeholder="Search..."
        onChangeText={updateSearch}
        platform={isIos ? 'ios' : isAndroid ? 'android' : 'default'}
        value={search}
        containerStyle={{ backgroundColor: 'transparent' }}
      />
      <Grid>
        <Row style={{ backgroundColor: theme.colors.paper }}>
          {data && <SearchFlatList {...{ data }} />}
        </Row>
      </Grid>
    </>
  );
};

export default Tag;
