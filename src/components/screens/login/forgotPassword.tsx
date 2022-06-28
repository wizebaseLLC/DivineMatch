import React from 'react';
import styled from 'styled-components/native';
import BackgroundContainerImage from './components/backgroundImage';
import ForgotPasswordForm from './components/forgotPasswordForm';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgb(13, 12, 29);
`;

const ForgotPassword = () => {
  return (
    <Container>
      <BackgroundContainerImage />
      <ForgotPasswordForm />
    </Container>
  );
};

export default ForgotPassword;
