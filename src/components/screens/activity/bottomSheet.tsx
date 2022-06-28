import React, { useContext } from 'react';
import { Dimensions, useColorScheme, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ThemeContext } from 'styled-components';
import { BottomSheetView } from './styledComponents';
import { StyledDivider, StyledListItem } from '../../../library/ui';

const windowWidth = Dimensions.get('window').width;

const list = [
  {
    title: 'Hide This Post',
    icon: 'eye-slash',
  },
  {
    title: 'Report Post',
    icon: 'flag',
  },
  {
    title: 'Block This User',
    icon: 'user-slash',
  },
];

const ListOptions = () => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const theme = useContext(ThemeContext);

  return (
    <View
      style={{
        width: windowWidth,
        marginLeft: -15,
        marginTop: theme.spacing * 4,
      }}
    >
      {list.map((item, i, a) => (
        <View key={i}>
          <StyledListItem>
            <FontAwesome5
              name={item.icon}
              color={isDark ? '#fff' : undefined}
            />
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
          </StyledListItem>
          {i + 1 !== a.length && <StyledDivider />}
        </View>
      ))}
    </View>
  );
};

const renderContent = () => (
  <BottomSheetView>
    <View style={{ paddingLeft: 16, paddingRight: 16 }}>
      <ListOptions />
    </View>
  </BottomSheetView>
);

export default renderContent;
