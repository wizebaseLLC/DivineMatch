import React, { useContext, useRef } from 'react';
import { Dimensions, ScrollView, View, StyleSheet } from 'react-native';
import { ThemeContext } from 'styled-components';
import styled from 'styled-components/native';
import { useScrollToTop } from '@react-navigation/native';
import MatchList, { MatchesCardProps } from './components/matchList';
import { IMAGE_PREFIX } from '../../../library/globalConstants';

const { height } = Dimensions.get('window');

const StyledHeaderView = styled.View.attrs(() => ({
  ...StyleSheet.absoluteFillObject,
}))`
  height: ${height * 0.2}px;
  background-color: rgba(208, 108, 238, 0.3);
  border-bottom-left-radius: 100px;
`;

const StyledFooterView = styled.View.attrs(() => ({}))`
  position: absolute;
  bottom: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: ${height * 1.2}px;
  background-color: rgba(105, 22, 130, 0.3);
  border-top-left-radius: 100px;
`;

const cards: MatchesCardProps[] = [
  {
    image: `${IMAGE_PREFIX}/staticImages/romantic-black-couple-resting-on-bed-under-blanket-TSFEQKV-2.jpg`,
    title: 'Divine Matches',
    caption: "Browse people you've matched with",
  },
  {
    image: `${IMAGE_PREFIX}/staticImages/black-couple-cooking-healthy-food-in-the-kitchen-PZ8DGHS-2.jpg`,
    title: 'See Who Likes You',
    caption: "Instantly match with those who've liked you",
  },
  {
    image: `${IMAGE_PREFIX}/staticImages/black-couple-drinking-wine-6PH6Y92-2.jpg`,
    title: 'Near You',
    caption: 'Find those most closest to you',
  },
  {
    image: `${IMAGE_PREFIX}/staticImages/people-gratitude-concept-horizontal-shot-pretty-young-african-american-female-dark-skinned-male-keep-hands-chest-being-thankful-people-who-helped-them-have-charming-smiles-2.jpg`,
    title: 'Spiritually Aligned',
    caption: 'View others who matches your spirituality',
  },
  {
    image: `${IMAGE_PREFIX}/staticImages/a-happy-couple-playing-video-game-in-bed-GHLP32J-2.jpg`,
    title: 'Similar Interest',
    caption: 'Match with those who have similiar interest',
  },
];

const CurvedHeaderContainer = () => <StyledHeaderView />;
const CurvedFooterContainer = () => <StyledFooterView />;

export default function Matches() {
  const theme = useContext(ThemeContext);
  const ref = useRef(null);

  useScrollToTop(ref);
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.paper }}
      {...{ ref }}
    >
      <CurvedHeaderContainer />
      <CurvedFooterContainer />
      <View style={{ marginBottom: theme.spacing * 3 }}>
        {cards.map((card, key) => (
          <View key={key}>
            <MatchList {...{ key, ...card }} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
