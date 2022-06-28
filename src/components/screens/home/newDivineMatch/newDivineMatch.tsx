import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import styled from 'styled-components/native';
import {
  NewDivineMatchScreenRouteProp,
  ViewUserScreenNavigationProp,
} from '../../../../screens/home';
import { SwiperCard } from '../Card';
import { Background } from '../swiper';

const { width } = Dimensions.get('window');

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.colors.paper};
`;

export const Content = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const ImageView = styled.View`
  flex-direction: row;
`;

export const HeaderText = styled(Text).attrs(() => ({
  h2: true,
}))`
  font-family: ${props => props.theme.font.heading};
  text-align: center;
`;

export const SubText = styled(Text).attrs(() => ({}))`
  font-family: ${props => props.theme.font.normal};
  margin-top: ${props => props.theme.spacing}px;
  text-align: center;
`;

const StyledButton = styled(Button).attrs(props => ({
  title: 'View',
  type: 'solid',
  icon: (
    <Icon name="sign-out-alt" size={15} color="white" type="font-awesome-5" />
  ),
  titleStyle: {
    margin: 4,
    fontFamily: props.theme.font.heading,
  },
  containerStyle: {
    width: width / 2,
    marginTop: props.theme.spacing * 2,
  },
  buttonStyle: {
    borderRadius: 25,
    backgroundColor: props.theme.colors.primary,
  },
}))``;

const StyledGoBackButton = styled(Button).attrs(props => ({
  title: 'Go Back',
  type: 'clear',

  titleStyle: {
    fontSize: 16,
    margin: 4,
    fontFamily: props.theme.font.subHeading,
  },
  containerStyle: {
    width: width / 2,
  },
}))``;

const StyledImage = styled(Image).attrs(() => ({
  // eslint-disable-next-line global-require
  source: require('../../../../../assets/images/icon.png'),
}))`
  height: 25px;
  width: 25px;
  align-self: center;
  margin-left: ${props => props.theme.spacing / 2}px;
`;

const NewDivineMatch = () => {
  const route = useRoute<NewDivineMatchScreenRouteProp>();
  const navigation = useNavigation<ViewUserScreenNavigationProp>();
  const { user } = route.params;

  const navigate = () => {
    navigation.navigate('ViewUser', { id: user.id });
  };

  return (
    <Container>
      <Background />
      <Content>
        <SwiperCard {...{ user }} noBorder />
        <ImageView>
          <HeaderText>New Divine Match</HeaderText>
          <StyledImage />
        </ImageView>
        <SubText>{`You've successfully matched with ${user.firstname}!`}</SubText>
        <StyledButton {...{ onPress: navigate }} />
        <StyledGoBackButton {...{ onPress: navigation.goBack }} />
      </Content>
    </Container>
  );
};

export default NewDivineMatch;
