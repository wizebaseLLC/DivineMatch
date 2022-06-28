import React from 'react';
import styled from 'styled-components/native';
import BackgroundContainerImage from './components/backgroundImage';
import ConfirmSignUpForm from './components/confirmSignupForm';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgb(13, 12, 29);
`;

const ConfirmSignUp = () => {
  return (
    <Container>
      <BackgroundContainerImage signUp />
      <ConfirmSignUpForm />
    </Container>
  );
};

export default ConfirmSignUp;
