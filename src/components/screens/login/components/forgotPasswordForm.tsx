/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image } from 'react-native';
import { Input, Text, Icon, Button } from 'react-native-elements';
import styled, { ThemeContext } from 'styled-components/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useToast } from 'react-native-styled-toast';
import { Auth } from 'aws-amplify';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { LOGIN_FORM_BORDER_RADIUS } from '../constants';
import { LoginScreenNavigationProp } from './loginFooter';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Container = styled(KeyboardAwareScrollView).attrs(() => ({
  contentContainerStyle: { alignItems: 'center' },
}))`
  flex: 1;

  width: ${windowWidth}px;
  background-color: #fff;
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

const SetEmailButton = styled(Button).attrs(props => ({
  title: 'Send Email Confirmation',
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
  code: Yup.string().required('Required'),
  password: Yup.string().min(8).required('Required'),
});

const ForgotPasswordForm = () => {
  const { toast } = useToast();
  const [hidePassword, setHidePassword] = useState(true);
  const [displayCode, setDisplayCode] = useState(false);
  const [email, setEmail] = useState('');
  const theme = useContext(ThemeContext);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const handleSetHidePassword = () => {
    setHidePassword(prev => !prev);
  };

  const handleChangeEmailText = (value: string) => {
    setEmail(value);
  };

  const handleSendEmail = async () => {
    try {
      await Auth.forgotPassword(email);
      setDisplayCode(true);
      toast({
        message: 'A password reset email has been sent to:',
        subMessage: email,
        intent: 'SUCCESS',
        duration: 8000,
      });
    } catch ({ message }) {
      toast({
        message,
        intent: 'ERROR',
        duration: 8000,
      });
    }
  };

  useEffect(() => {
    return () => {
      setDisplayCode(false);
      setEmail('');
    };
  }, []);
  return (
    <Formik
      initialValues={{
        email,
        code: '',
        password: '',
      }}
      validationSchema={schema}
      enableReinitialize
      onSubmit={async values => {
        try {
          await Auth.forgotPasswordSubmit(
            values.email,
            values.code,
            values.password,
          );
          toast({
            message: 'Password Updated!',
            intent: 'SUCCESS',
            duration: 8000,
          });
          navigation.goBack();
        } catch ({ message }) {
          toast({
            message,
            intent: 'ERROR',
            duration: 8000,
          });
        }
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
            <HeaderText>Confirm Signup</HeaderText>
          </HeaderTextContainer>
          <InstructionsView>
            {!displayCode ? (
              <InstructionsText>
                Please enter the email address associated with your account
              </InstructionsText>
            ) : (
              <InstructionsText>
                Please enter the code that was sent to your email address:
                {` ${values.email}`}
              </InstructionsText>
            )}
          </InstructionsView>
          <FormView>
            {!displayCode ? (
              <>
                <Input
                  placeholder="Enter your Email"
                  label={windowHeight > 850 ? 'Email' : undefined}
                  onChangeText={handleChangeEmailText}
                  inputStyle={{ color: 'black' }}
                  value={email}
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
                <LoginButtonView>
                  <SetEmailButton
                    onPress={handleSendEmail}
                    disabled={email.length === 0}
                  />
                </LoginButtonView>
              </>
            ) : (
              <>
                <Input
                  placeholder="Enter your code"
                  label="Code"
                  onChangeText={handleChange('code')}
                  inputStyle={{ color: 'black' }}
                  onBlur={handleBlur('code')}
                  labelStyle={{ marginTop: theme.spacing * 2 }}
                  value={values.code}
                  errorMessage={touched.code ? errors.code : undefined}
                  inputContainerStyle={
                    touched.code && errors.code
                      ? { borderColor: 'red' }
                      : undefined
                  }
                  leftIcon={
                    <Icon
                      name="lock"
                      type="font-awesome-5"
                      size={17}
                      color="black"
                      iconStyle={{ opacity: 0.6 }}
                    />
                  }
                />
                <Input
                  placeholder="Enter your new Password"
                  label={windowHeight > 850 ? 'New Password' : undefined}
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
                <LoginButtonView>
                  <LoginButton onPress={handleSubmit as any} />
                </LoginButtonView>
              </>
            )}
          </FormView>
        </Container>
      )}
    </Formik>
  );
};
export default ForgotPasswordForm;
