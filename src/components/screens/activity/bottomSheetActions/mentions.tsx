import { ListItem, Avatar } from 'react-native-elements';
import React, { useContext, useMemo } from 'react';
import { MentionSuggestionsProps } from 'react-native-controlled-mentions';
import styled, { ThemeContext } from 'styled-components/native';
import { View, Pressable, Dimensions } from 'react-native';
import { useListUserByNameQuery } from '../../../../generated/generated';
import {
  StyledDivider,
  StyledListItem,
  WhiteOverlay,
} from '../../../../library/ui';

const { width } = Dimensions.get('window');
const MentionView = styled.ScrollView.attrs(() => ({
  shadowOffset: { width: 2, height: 2 },
  shadowOpacity: 0.4,
  shadowRadius: 5,
  keyboardShouldPersistTaps: 'handled',
}))`
  padding: ${props => props.theme.spacing / 2}px;
  height: 200px;
  width: ${width * 0.9}px;
`;

export const RenderSuggestions: React.FC<MentionSuggestionsProps> = ({
  keyword,
  onSuggestionPress,
}) => {
  const theme = useContext(ThemeContext);

  const { data: serverSuggestions } = useListUserByNameQuery({
    variables: { name: keyword as string },
  });

  const suggestions = useMemo(
    () =>
      serverSuggestions?.listUsersByName?.map(x => ({
        id: x?.id,
        name: `${x?.firstname} ${x?.lastname}`,
        image: x?.profilepic,
      })),
    [serverSuggestions],
  );

  const onPress = (input: { id: string; name: string }) => () =>
    onSuggestionPress(input);

  if (keyword == null) {
    return null;
  }

  return (
    <View>
      <MentionView>
        {suggestions
          ?.filter(one =>
            one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()),
          )
          .map(one => (
            <Pressable key={one.id} onPress={onPress(one)}>
              <StyledListItem>
                <Avatar
                  size="small"
                  rounded
                  source={{
                    uri: one?.image,
                  }}
                  containerStyle={{
                    height: 28,
                    width: 28,
                  }}
                />
                <ListItem.Title
                  style={{ fontFamily: theme.font.normal, fontSize: 12 }}
                >
                  {one.name}
                </ListItem.Title>
                <WhiteOverlay borderRadius={0} />
              </StyledListItem>
              <StyledDivider />
            </Pressable>
          ))}
      </MentionView>
    </View>
  );
};

export const RenderHashTags: React.FC<MentionSuggestionsProps> = ({
  keyword,
  onSuggestionPress,
}) => {
  const theme = useContext(ThemeContext);

  const suggestions = [
    {
      id: keyword as string,
      name: keyword as string,
    },
    {
      id: 'bunglord',
      name: 'bunglord',
    },
  ];
  const onPress = (input: { id: string; name: string }) => () =>
    onSuggestionPress(input);

  if (keyword == null) {
    return null;
  }

  return (
    <View>
      <MentionView>
        {suggestions
          ?.filter(one =>
            one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()),
          )
          .map(one => (
            <Pressable key={one.id} onPress={onPress(one)}>
              <StyledListItem>
                <ListItem.Title
                  style={{ fontFamily: theme.font.normal, fontSize: 14 }}
                >
                  {one.name}
                </ListItem.Title>
                <WhiteOverlay borderRadius={0} />
              </StyledListItem>
              <StyledDivider />
            </Pressable>
          ))}
      </MentionView>
    </View>
  );
};
