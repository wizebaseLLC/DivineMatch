import React, { useContext, useMemo, useRef, useState } from 'react';
import { Image, Keyboard, StyleSheet, View } from 'react-native';
import { Avatar, Icon, Text } from 'react-native-elements';
import styled, { ThemeContext } from 'styled-components/native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useNavigation, useRoute } from '@react-navigation/native';
import { uniqBy } from 'lodash';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { SharedElement } from 'react-navigation-shared-element';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useMyProfileQuery } from '../../../../generated/generated';
import Tag from './tag';
import Flair from './flair';
import {
  PostModalNavigationProp,
  PostModalScreenRouteProp,
} from '../../../../screens/activity';

const Header = styled.View`
  padding-left: ${props => props.theme.spacing * 2}px;
  margin-top: ${props => props.theme.spacing * 2}px;
  flex-direction: row;
  justify-content: space-between;
`;

const TagsView = styled.View`
  margin-left: ${props => props.theme.spacing}px;
  flex-direction: row;
  margin-top: ${props => props.theme.spacing / 2}px;
  flex-wrap: wrap;
`;

const EmojiView = styled.View`
  margin-left: ${props => props.theme.spacing * 2}px;
  flex-direction: row;
  margin-top: ${props => props.theme.spacing / 2}px;
  align-items: center;
`;

const Emoji = styled(Text)`
  font-family: ${props => props.theme.font.RalewayBoldItalic};
  font-size: 14px;
`;

const EmojiText = styled(Text)`
  font-family: ${props => props.theme.font.RalewayBoldItalic};
  font-size: 10px;
  color: ${props => props.theme.colors.secondary};
`;

const Box = styled.View`
  flex-direction: row;
`;

const IconView = styled.View`
  flex-direction: row;
  align-items: center;
  position: absolute;
  right: 0px;
`;

const IconText = styled(Text)`
  font-family: ${props => props.theme.font.light};
  font-size: 12px;
  text-align: center;
  margin-top: ${props => props.theme.spacing / 2}px;
  color: ${props => props.theme.colors.secondary};
`;

const TagText = styled(Text)`
  font-family: ${props => props.theme.font.Raleway};
  font-size: 11px;
  margin-top: ${props => props.theme.spacing / 2}px;
  color: ${props => props.theme.colors.primary};
  margin-left: ${props => props.theme.spacing * 2}px;
`;

const IconWrapper = styled.TouchableOpacity`
  padding-right: ${props => props.theme.spacing * 2.5}px;
  padding-left: ${props => props.theme.spacing * 2.5}px;
`;

const NameText = styled(Text)`
  align-self: center;
  font-family: ${props => props.theme.font.normal};
  font-size: 14px;
  margin-left: ${props => props.theme.spacing}px;
`;

export const sharedActions = [
  { id: 'tag', title: 'Tag a friend', icon: 'tag', color: '#FF375F' },
  {
    id: 'flair',
    title: 'Add a spiritual flair',
    icon: 'fire',
    color: '#AF52DE',
  },
];

interface Props {
  hasMedia?: boolean;
}

export const BackgroundComponent = () => {
  const theme = useContext(ThemeContext);
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: theme.colors.paper,
        borderRadius: 13,
        flex: 1,
      }}
    />
  );
};

export type Choices = 'tag' | 'flair';
const sheetOptions = ['View', 'Remove', 'Cancel'];
const cancelButtonIndex = 2;

const BottomSheetHeader: React.FC<Props> = ({ hasMedia }) => {
  const { data: me } = useMyProfileQuery();
  const name = `${me?.myProfile?.firstname} ${me?.myProfile?.lastname}`;
  const [currentItem, setCurrentItem] = useState<Choices>('tag');
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [0, '95%'], []);
  const route = useRoute<PostModalScreenRouteProp>();
  const nav = useNavigation<PostModalNavigationProp>();
  const theme = useContext(ThemeContext);
  const { showActionSheetWithOptions } = useActionSheet();

  const onPressItem = (id: Choices) => () => {
    setCurrentItem(id);
    bottomSheetRef?.current?.expand();
    Keyboard.dismiss();
  };

  const onPressTag = (id: string) => () => {
    showActionSheetWithOptions(
      {
        options: sheetOptions,
        cancelButtonIndex,
        destructiveButtonIndex: 1,
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          nav.setParams({
            tags: route?.params?.tags?.filter(x => x.id !== id),
          });
        } else if (buttonIndex === 0) {
          nav.navigate('ViewUser', { id });
        }
      },
    );
  };

  return (
    <View style={{ zIndex: 2 }}>
      <Header>
        <Box>
          <Avatar
            size="small"
            rounded
            source={{
              uri: me?.myProfile?.profilepic,
            }}
          />
          <NameText>{name}</NameText>
        </Box>

        {!hasMedia && (
          <IconView>
            {sharedActions.map(x => (
              <IconWrapper key={x.id} onPress={onPressItem(x.id as Choices)}>
                <Icon
                  name={x.icon}
                  type="font-awesome-5"
                  color={x.color}
                  size={30}
                />
                <IconText>{x.id}</IconText>
              </IconWrapper>
            ))}
          </IconView>
        )}
      </Header>
      {route.params?.flair?.name && route.params?.flair?.emoji && (
        <EmojiView>
          <EmojiText>{`Feeling ${route.params?.flair?.name}  `}</EmojiText>
          <Emoji>{route.params?.flair?.emoji}</Emoji>
        </EmojiView>
      )}
      {route.params?.tags?.[0] && (
        <>
          <TagText>Along with </TagText>
          <TagsView>
            {uniqBy(route.params?.tags, 'id')?.map((tag, index) => (
              <TouchableOpacity onPress={onPressTag(tag.id)} key={index}>
                <SharedElement id={tag.id}>
                  <Image
                    source={{ uri: tag?.profilepic }}
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 40,
                      margin: theme.spacing / 2,
                    }}
                  />
                </SharedElement>
              </TouchableOpacity>
            ))}
          </TagsView>
        </>
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={BottomSheetBackdrop}
        backgroundComponent={BackgroundComponent}
      >
        {currentItem === 'tag' && <Tag />}
        {currentItem === 'flair' && <Flair />}
      </BottomSheet>
    </View>
  );
};

export default BottomSheetHeader;
