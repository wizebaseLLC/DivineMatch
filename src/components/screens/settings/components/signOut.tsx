import React from 'react';
import { Dimensions, View } from 'react-native';
import styled from 'styled-components/native';
import { Icon, Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';

const windowWidth = Dimensions.get('window').width;

const LogOutButtonView = styled.View`
  align-self: center;
  width: ${windowWidth / 1.5}px;
  margin-top: ${props => props.theme.spacing * 2}px;
  padding-bottom: ${theme => theme.theme.spacing * 2}px;
`;

const LogOutButton = styled(Button).attrs(props => ({
  title: 'Sign Out',
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

const SignOut = () => {
  const onPress = async () => {
    await Auth.signOut().catch(console.log);
  };
  return (
    <View>
      <LogOutButtonView>
        <LogOutButton
          {...{ onPress }}
          icon={
            <Icon
              name="sign-out-alt"
              size={15}
              color="white"
              type="font-awesome-5"
            />
          }
        />
      </LogOutButtonView>
    </View>
  );
};

export default SignOut;
