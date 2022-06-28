import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import {
  ProfileSectionHeaderText,
  ProfileSectionText,
} from './styledComponents';

const { width } = Dimensions.get('window');

interface Props {
  about: string;
}

const Container = styled.View`
  margin-top: ${props => props.theme.spacing * 4}px;
  align-items: center;
`;

const TextContainer = styled.View`
  margin-top: ${props => props.theme.spacing * 2}px;
  align-items: center;
  width: ${width * 0.95}px;
`;

const Biography: React.FC<Props> = props => {
  const { about } = props;
  return (
    <Container>
      <ProfileSectionHeaderText>Get to know me</ProfileSectionHeaderText>
      <TextContainer>
        <ProfileSectionText>
          {about?.replace(/[\n\r]+/g, '\n\r')}
        </ProfileSectionText>
      </TextContainer>
    </Container>
  );
};

export default Biography;
