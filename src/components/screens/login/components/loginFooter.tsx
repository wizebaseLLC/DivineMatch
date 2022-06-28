import React from 'react';
import { SocialIcon, Text, Button } from 'react-native-elements';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../library/navigator';
import { loginWithFacebook, loginWithGoogle } from './socialLoginFunctions';

const Container = styled.View`
  flex: 0.3;
`;

const SocialIconView = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const StyleSocialIcon = styled(SocialIcon).attrs(() => ({}))`
  margin-top: ${props => props.theme.spacing * 2}px;
`;

const ForgotPasswordText = styled(Text).attrs(() => ({}))`
  font-family: ${props => props.theme.font.subHeading};
  align-self: center;
  text-align: center;
  font-size: 14px;
  opacity: 0.8;
  color: rgb(144, 142, 157);
  margin-top: ${props => props.theme.spacing}px;
`;

const ForgotPasswordButton = styled(Button).attrs(props => ({
  type: 'clear',
  titleStyle: {
    fontSize: 14,
    color: props.theme.colors.secondaryAlt,
  },
}))`
  margin-top: ${props => props.theme.spacing}px;
`;

export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface Props {
  signUp?: boolean;
}

const LoginFooter = (props: Props) => {
  const { signUp } = props;

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const onPress = () =>
    signUp ? navigation.navigate('Login') : navigation.navigate('SignUp');

  return (
    <Container>
      <SocialIconView>
        <StyleSocialIcon type="facebook" raised onPress={loginWithFacebook} />
        <StyleSocialIcon type="google" raised onPress={loginWithGoogle} />
      </SocialIconView>
      <SocialIconView>
        <ForgotPasswordText>
          {!signUp ? `Don't have an account?` : `Have an account?`}
        </ForgotPasswordText>
        <ForgotPasswordButton
          title={!signUp ? 'Sign up here' : `Sign In`}
          {...{ onPress }}
        />
      </SocialIconView>
    </Container>
  );
};

export default LoginFooter;
