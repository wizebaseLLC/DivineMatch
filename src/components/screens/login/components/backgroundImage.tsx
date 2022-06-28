import React from 'react';
import { Image, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { LOGIN_FORM_BORDER_RADIUS } from '../constants';

interface LoginFormProps {
  signUp?: boolean;
}

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const Container = styled.View`
  flex: 0.3;
  border-bottom-left-radius: ${LOGIN_FORM_BORDER_RADIUS}px;
`;

const BackgroundContainerImage: React.FunctionComponent<LoginFormProps> = props => {
  const { signUp } = props;
  return (
    <Container>
      <Image
        style={{
          height: height / 3,
          width,
          justifyContent: 'center',
        }}
        source={
          signUp
            ? require('../../../../../assets/images/blackwoman2.jpg')
            : require('../../../../../assets/images/blackwoman.jpg')
        }
      />
    </Container>
  );
};

export default BackgroundContainerImage;
