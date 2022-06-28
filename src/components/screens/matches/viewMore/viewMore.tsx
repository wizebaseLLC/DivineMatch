import { useRoute } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View } from 'react-native';
import { ThemeContext } from 'styled-components';
import { MatchesScreenRouteProp } from '../../../../screens/matches';
import CurrentlyActivefrom from './currentlyOnline';
import MatchCard from './matchCard';

export default function ViewMore() {
  const route = useRoute<MatchesScreenRouteProp>();
  const isRecentlyActive = route.params.title === 'Near You';
  const theme = useContext(ThemeContext);

  return (
    <View style={{ backgroundColor: theme.colors.paper, flex: 1 }}>
      {isRecentlyActive ? <CurrentlyActivefrom /> : <MatchCard />}
    </View>
  );
}
