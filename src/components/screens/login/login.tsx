import React from 'react';
import styled from 'styled-components/native';
import BackgroundContainerImage from './components/backgroundImage';
import LoginFooter from './components/loginFooter';
import LoginForm from './components/loginForm';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgb(13, 12, 29);
`;

const Login = () => {
  return (
    <Container>
      <BackgroundContainerImage />
      <LoginForm />
      <LoginFooter />
    </Container>
  );
};

export default Login;
