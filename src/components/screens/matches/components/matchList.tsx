import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import { Tile } from 'react-native-elements';
import styled, { ThemeContext } from 'styled-components/native';
import Ripple from 'react-native-material-ripple';
import { MatchesScreenNavigationProp } from '../../../../screens/matches';

const { width } = Dimensions.get('window');

const Container = styled.View`
  margin-top: ${props => props.theme.spacing * 3}px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export interface MatchesCardProps {
  title: string;
  image: string;
  caption?: string;
}
export default function MatchList(props: MatchesCardProps) {
  const { image, title, caption } = props;
  const navigation = useNavigation<MatchesScreenNavigationProp>();
  const theme = useContext(ThemeContext);
  const onPress = () => {
    navigation.navigate('MoreMatches', { title });
  };
  return (
    <Container>
      <Ripple
        {...{
          rippleContainerBorderRadius: 50,
          onPress,
        }}
      >
        <Tile
          imageSrc={{
            uri: image,
          }}
          containerStyle={{
            shadowOffset: { width: 2, height: 2 },
            shadowColor: '#000',
            shadowOpacity: 0.6,
          }}
          imageContainerStyle={{
            borderRadius: 50,
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}
          titleStyle={{
            fontSize: 30,
            fontFamily: theme.font.heading,
          }}
          captionStyle={{
            fontSize: 18,
            fontFamily: theme.font.heading,
            color: theme.colors.primaryAlt,
          }}
          {...{
            title,
            caption,
            featured: true,
            width: width * 0.9,
          }}
        />
      </Ripple>
    </Container>
  );
}
