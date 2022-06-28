import React from 'react';
import { Dimensions } from 'react-native';
import { BottomSheetScrollView, useBottomSheet } from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';
import { Text } from 'react-native-elements';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from '@react-navigation/native';
import { HeaderText } from './tag';
import { PostModalNavigationProp } from '../../../../screens/activity';

const { width } = Dimensions.get('window');
const Container = styled(BottomSheetScrollView)`
  flex: 0.795;
`;

const FlairContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${props => props.theme.spacing * 2}px;
  border-bottom-width: 1px;
`;

const FlairView = styled(Ripple).attrs(props => ({
  rippleColor: props.theme.colors.primary,
}))`
  flex-direction: row;
  width: ${width / 2}px;
  justify-content: center;
  border-width: 1px;
  border-bottom-width: 0px;
  border-right-width: 0px;
  padding: ${props => props.theme.spacing * 2}px;
`;

const Emoji = styled(Text)`
  align-self: center;
  font-family: ${props => props.theme.font.RalewayBoldItalic};
  font-size: 32px;
`;

const EmojiText = styled(Text)`
  align-self: center;
  font-family: ${props => props.theme.font.RalewayBoldItalic};
  font-size: 14px;
`;

export interface Mood {
  name: string;
  emoji: string;
}

const moods: Mood[] = [
  {
    name: 'Hopeful',
    emoji: '🙂',
  },
  {
    name: 'Blessed',
    emoji: '😇',
  },
  {
    name: 'Loved',
    emoji: '🥰',
  },
  {
    name: 'Enraged',
    emoji: '🤬',
  },

  {
    name: 'Bashful',
    emoji: '☺',
  },
  {
    name: 'Romantic',
    emoji: '😘',
  },

  {
    name: 'Lonely',
    emoji: '😕',
  },
  {
    name: 'Humorous',
    emoji: '😂',
  },
  {
    name: 'Sleepy',
    emoji: '😴',
  },
  {
    name: 'Upset',
    emoji: '🥺',
  },

  {
    name: 'Happy',
    emoji: '😁',
  },
  {
    name: 'Done',
    emoji: '🤯',
  },
  {
    name: 'So Fly',
    emoji: '😎',
  },
  {
    name: 'Nerdy',
    emoji: '🤓',
  },

  {
    name: 'Scared',
    emoji: '😰',
  },
  {
    name: 'Not Well',
    emoji: '🤒',
  },
  {
    name: 'Aware',
    emoji: '🤗',
  },
  {
    name: 'Really?',
    emoji: '😑',
  },
  {
    name: 'Like a Queen',
    emoji: '👸🏽',
  },
  {
    name: 'Like a King',
    emoji: '🤴🏽',
  },
  {
    name: 'Strong',
    emoji: '💪🏽',
  },

  {
    name: 'Outta Here',
    emoji: '👊🏽',
  },

  {
    name: 'Cute',
    emoji: '💅🏽',
  },
  {
    name: 'Calm',
    emoji: '🧘🏽‍♀️',
  },
  {
    name: 'Athletic',
    emoji: '🚴🏽‍♂️',
  },
  {
    name: 'Adventurous',
    emoji: '🧗🏽‍♀️',
  },
];

const Flair: React.FunctionComponent = () => {
  const { close } = useBottomSheet();
  const nav = useNavigation<PostModalNavigationProp>();

  const onPress = (flair: Mood) => () => {
    nav.setParams({ flair });
    close();
  };
  return (
    <Container>
      <HeaderText>How are you, spiritually?</HeaderText>
      <FlairContainer>
        {moods.map(({ emoji, name }, index) => (
          <FlairView key={index} onPress={onPress({ emoji, name } as Mood)}>
            <Emoji>{emoji}</Emoji>
            <EmojiText>{`  ${name}`}</EmojiText>
          </FlairView>
        ))}
      </FlairContainer>
    </Container>
  );
};

export default Flair;
