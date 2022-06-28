/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import { Dimensions, Image } from 'react-native';
import { Input, Text, Icon, Button } from 'react-native-elements';
import styled, { ThemeContext } from 'styled-components/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useToast } from 'react-native-styled-toast';
import { Auth } from 'aws-amplify';
import { RouteProp, useRoute } from '@react-navigation/native';
import { LOGIN_FORM_BORDER_RADIUS } from '../constants';
import { RootStackParamList } from '../../../../library/navigator';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Container = styled.View`
  flex: 1;
  align-items: center;
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

const ForgotcodeView = styled.View`
  align-self: flex-end;
  width: ${windowWidth / 1.5}px;
  margin-top: ${props => -props.theme.spacing * 1}px;
`;

const ResendCodeButton = styled(Button).attrs(props => ({
  title: 'Resend Code',
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
  code: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

type ConfirmSignupScreenRouteProp = RouteProp<
  RootStackParamList,
  'ConfirmSignUp'
>;

const ConfirmSignUpForm = () => {
  const { toast } = useToast();
  const theme = useContext(ThemeContext);
  const route = useRoute<ConfirmSignupScreenRouteProp>();

  const resendCode = async () => {
    await Auth.resendSignUp(route.params.email);
    toast({
      message: `Resent Code to ${route.params.email}`,
      intent: 'SUCCESS',
      duration: 8000,
    });
  };
  return (
    <Formik
      initialValues={{
        email: route.params.email,
        password: route.params.password,
        code: '',
      }}
      enableReinitialize
      validationSchema={schema}
      onSubmit={async values => {
        try {
          await Auth.confirmSignUp(values.email, values.code);
          await Auth.signIn(values.email, values.password);
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
            <InstructionsText>
              Please enter the code that was sent to your email address:
              {` ${values.email}`}
            </InstructionsText>
          </InstructionsView>
          <FormView>
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
                touched.code && errors.code ? { borderColor: 'red' } : undefined
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
          </FormView>
          <ForgotcodeView>
            <ResendCodeButton onPress={resendCode} />
          </ForgotcodeView>
          <LoginButtonView>
            <LoginButton onPress={handleSubmit as any} />
          </LoginButtonView>
        </Container>
      )}
    </Formik>
  );
};
export default ConfirmSignUpForm;
