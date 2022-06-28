import React from 'react';
import styled from 'styled-components/native';
import BackgroundContainerImage from './components/backgroundImage';
import SignUpFooter from './components/loginFooter';
import SignUpForm from './components/signUpForm';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgb(13, 12, 29);
`;

const SignUp = () => {
  return (
    <Container>
      <BackgroundContainerImage signUp />
      <SignUpForm />
      <SignUpFooter signUp />
    </Container>
  );
};

export default SignUp;
