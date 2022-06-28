import React, { useContext } from 'react';
import { View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { ThemeContext } from 'styled-components';
import { StyledListItem } from '../../../library/ui';
import { MessageText, DateText } from './styledComponents';

export interface ListProps {
  name: string;
  message: string;
  date: Date;
  avatarUrl: string;
}

const List: React.FunctionComponent<ListProps> = props => {
  const { avatarUrl, name, date, message } = props;

  const theme = useContext(ThemeContext);

  return (
    <View>
      <StyledListItem
        {...{
          containerStyle: {
            backgroundColor: theme.colors.paper,
          },
        }}
      >
        <Avatar rounded size="medium" source={{ uri: avatarUrl }} />
        <ListItem.Content>
          <MessageText>{`${name} ${message}`}</MessageText>
          <DateText>{date.toLocaleDateString()}</DateText>
        </ListItem.Content>
        <ListItem.Chevron />
      </StyledListItem>
    </View>
  );
};

export default List;
