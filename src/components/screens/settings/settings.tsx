import React from 'react';
import styled from 'styled-components/native';
import AccountSettings from './components/accountSettings';
import PromoHeader from './components/promoHeader';
import SignOut from './components/signOut';

const Container = styled.ScrollView`
  flex: 1;
`;

const Settings = () => {
  return (
    <Container>
      <PromoHeader />
      <AccountSettings />
      <AccountSettings />
      <AccountSettings />
      <AccountSettings />
      <SignOut />
    </Container>
  );
};

export default Settings;
