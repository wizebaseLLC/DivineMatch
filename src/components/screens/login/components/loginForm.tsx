/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from 'react';
import { Dimensions, Image } from 'react-native';
import { Input, Text, Icon, Button } from 'react-native-elements';
import styled, { ThemeContext } from 'styled-components/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useToast } from 'react-native-styled-toast';
import { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import { LOGIN_FORM_BORDER_RADIUS } from '../constants';
import { LoginScreenNavigationProp } from './loginFooter';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Container = styled.View`
  flex: 0.8;
  align-items: center;
  width: ${windowWidth}px;
  background-color: #fff;
  border-bottom-left-radius: ${LOGIN_FORM_BORDER_RADIUS}px;
  border-bottom-right-radius: ${LOGIN_FORM_BORDER_RADIUS}px;
  border-top-right-radius: ${LOGIN_FORM_BORDER_RADIUS}px;
  border-top-left-radius: ${LOGIN_FORM_BORDER_RADIUS}px;
`;

const HeaderTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: ${props => props.theme.spacing}px;
  padding-bottom: ${props => props.theme.spacing * 2}px;
  margin-top: ${props => props.theme.spacing * 3}px;
`;

const HeaderText = styled(Text).attrs(() => ({
  h3: true,
}))`
  font-family: ${props => props.theme.font.heading};
  color: black;
  padding-left: ${props => props.theme.spacing / 2}px;
`;

const InstructionsText = styled(Text).attrs(() => ({}))`
  font-family: ${props => props.theme.font.normal};
  align-self: center;
  text-align: center;
  color: ${props => props.theme.colors.primary};
  opacity: 0.8;
`;

const InstructionsView = styled.View`
  width: ${windowWidth / 1.5}px;
`;

const FormView = styled.View`
  padding-top: ${props => props.theme.spacing * 2}px;
  width: ${windowWidth / 1.3}px;
`;

const ForgotPasswordView = styled.View`
  align-self: flex-end;
  width: ${windowWidth / 1.5}px;
  margin-top: ${props => -props.theme.spacing * 1}px;
`;

const ForgotPasswordButton = styled(Button).attrs(props => ({
  title: 'Forgot Password?',
  type: 'clear',
  titleStyle: {
    fontSize: 12,
    color: props.theme.colors.secondaryAlt,
  },
}))``;

const LoginButtonView = styled.View`
  align-self: center;
  width: ${windowWidth / 1.5}px;
  margin-top: ${props =>
    windowHeight > 850 ? props.theme.spacing * 3 : props.theme.spacing}px;
`;

const LoginButton = styled(Button).attrs(props => ({
  title: 'Log Into Your Account',
  type: 'solid',
  titleStyle: {
    fontSize: 16,
    margin: 4,
  },
  buttonStyle: {
    borderRadius: 25,
    backgroundColor: props.theme.colors.secondaryAlt,
  },
}))``;

const schema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(8, 'Password must be atleast 8 characters long')
    .required('Required'),
});

const LoginForm = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleSetHidePassword = () => {
    setHidePassword(prev => !prev);
  };

  const onBackdropPress = () => {
    navigation.navigate('ForgotPassword');
  };
  const { toast } = useToast();
  const theme = useContext(ThemeContext);
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={schema}
      onSubmit={async values => {
        console.log({ values });
        Auth.signIn(values.email, values.password).catch(err => {
          toast({
            message: err.message,
            intent: 'ERROR',
            duration: 8000,
          });
        });
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <Container>
          <HeaderTextContainer>
            <Image
              source={require('../../../../../assets/images/icon.png')}
              style={{ height: 25, width: 25 }}
            />
            <HeaderText>Welcome Back</HeaderText>
          </HeaderTextContainer>

          <InstructionsView>
            <InstructionsText>
              Use your credentials below to log into your account
            </InstructionsText>
          </InstructionsView>
          <FormView>
            <Input
              placeholder="Enter your Email"
              label={windowHeight > 850 ? 'Email' : undefined}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              errorMessage={touched.email ? errors.email : undefined}
              inputStyle={{ color: 'black' }}
              inputContainerStyle={
                touched.email && errors.email
                  ? { borderColor: 'red' }
                  : undefined
              }
              value={values.email}
              leftIcon={
                <Icon
                  name="envelope"
                  type="font-awesome"
                  size={17}
                  color="black"
                  iconStyle={{ opacity: 0.6 }}
                />
              }
            />
            <Input
              placeholder="Enter your Password"
              label={windowHeight > 850 ? 'Password' : undefined}
              onChangeText={handleChange('password')}
              inputStyle={{ color: 'black' }}
              onBlur={handleBlur('password')}
              labelStyle={{ marginTop: theme.spacing * 2 }}
              value={values.password}
              errorMessage={touched.password ? errors.password : undefined}
              inputContainerStyle={
                touched.password && errors.password
                  ? { borderColor: 'red' }
                  : undefined
              }
              secureTextEntry={hidePassword}
              leftIcon={
                <Icon
                  name="lock"
                  type="font-awesome-5"
                  size={17}
                  color="black"
                  iconStyle={{ opacity: 0.6 }}
                />
              }
              rightIcon={
                <Icon
                  name={hidePassword ? 'eye-slash' : 'eye'}
                  type="font-awesome-5"
                  size={25}
                  color="black"
                  iconStyle={{ opacity: 0.6 }}
                  onPress={handleSetHidePassword}
                />
              }
            />
          </FormView>
          <ForgotPasswordView>
            <ForgotPasswordButton onPress={onBackdropPress} />
          </ForgotPasswordView>
          <LoginButtonView>
            <LoginButton onPress={handleSubmit as any} />
          </LoginButtonView>
        </Container>
      )}
    </Formik>
  );
};
export default LoginForm;
