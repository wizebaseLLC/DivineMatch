import React, { useContext } from 'react';
import { View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { ThemeContext } from 'styled-components';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { useNavigation, useRoute } from '@react-navigation/native';
import { uniqBy } from 'lodash';
import { DateText, MessageText } from '../../search/styledComponents';
import {
  PostModalNavigationProp,
  PostModalScreenRouteProp,
} from '../../../../screens/activity';
import { useGetUserQuery } from '../../../../generated/generated';

export interface ListProps {
  name: string;
  profilepic: string;
  id: string;
}

const List: React.FunctionComponent<ListProps> = props => {
  console.log(props);
  const { profilepic, name, id } = props;

  const theme = useContext(ThemeContext);
  const { close } = useBottomSheet();

  const nav = useNavigation<PostModalNavigationProp>();
  const route = useRoute<PostModalScreenRouteProp>();

  useGetUserQuery({
    variables: {
      id,
    },
  });

  const onPress = () => {
    const currentTags = route.params?.tags;

    if (currentTags?.[0]) {
      nav.setParams({
        tags: uniqBy([...currentTags, { id, name, profilepic }], 'id'),
      });
    } else {
      nav.setParams({ tags: [{ id, name, profilepic }] });
    }

    close();
  };
  return (
    <View style={{ flex: 1 }}>
      <ListItem
        {...{
          onPress,
          containerStyle: {
            backgroundColor: theme.colors.paper,
          },
        }}
      >
        <Avatar rounded size="small" source={{ uri: profilepic }} />
        <ListItem.Content>
          <MessageText>{name}</MessageText>
          <DateText>{name}</DateText>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  );
};

export default List;
