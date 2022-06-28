import React from 'react';
import { Image } from 'react-native';
import { Text } from 'react-native-elements';
import styled from 'styled-components/native';

interface StackTitleProps {
  title: string;
  noColor?: boolean;
  noImage?: boolean;
  large?: boolean;
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: ${props => props.theme.spacing}px;
`;

const HeaderText = styled(Text).attrs<{ large: boolean }>(props => ({
  h2: !!props.large,
  h3: !props.large,
}))`
  color: #fff;
  font-family: ${props => props.theme.font.heading};
  text-transform: capitalize;
`;

const HeaderTextNoColor = styled(Text).attrs<{ large: boolean }>(props => ({
  h2: !!props.large,
  h3: !props.large,
}))`
  font-family: ${props => props.theme.font.heading};
  text-transform: capitalize;
`;

const StyledImage = styled(Image).attrs(() => ({
  // eslint-disable-next-line global-require
  source: require('../../assets/images/icon.png'),
}))`
  height: 20px;
  width: 20px;
  margin-left: ${props => props.theme.spacing / 2}px;
`;

const StackTitle: React.FunctionComponent<StackTitleProps> = props => {
  const { title, noColor, noImage, large } = props;

  return (
    <Container>
      {noColor ? (
        <HeaderTextNoColor {...{ large }}>{title}</HeaderTextNoColor>
      ) : (
        <HeaderText {...{ large }}>{title}</HeaderText>
      )}
      {!noImage && <StyledImage />}
    </Container>
  );
};

export default StackTitle;
