import React, { useContext } from 'react';
import { View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { ThemeContext } from 'styled-components';
import { MessageText, DateText } from './styledComponents';

export interface ListProps {
  name: string;
  searchType: string;
  avatarUrl: string;
}

const List: React.FunctionComponent<ListProps> = props => {
  const { avatarUrl, name, searchType } = props;

  const theme = useContext(ThemeContext);

  return (
    <View>
      <ListItem
        {...{
          containerStyle: {
            backgroundColor: theme.colors.paper,
          },
        }}
      >
        <Avatar rounded size="small" source={{ uri: avatarUrl }} />
        <ListItem.Content>
          <MessageText>{name}</MessageText>
          <DateText>{searchType}</DateText>
        </ListItem.Content>
        <ListItem.Chevron name="arrow-right" type="font-awesome" />
      </ListItem>
    </View>
  );
};

export default List;
