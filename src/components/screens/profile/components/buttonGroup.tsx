import React, { useContext } from 'react';
import { ButtonGroup } from 'react-native-elements';
import { ThemeContext } from 'styled-components';
import styled from 'styled-components/native';

interface ButtonGroupFeedProps {
  index: number;
  handleSetButtonIndex: (index: number) => void;
}

const Container = styled.View`
  margin-top: ${props => props.theme.spacing * 4}px;
`;

const ButtonGroupFeed: React.FunctionComponent<ButtonGroupFeedProps> = props => {
  const { index, handleSetButtonIndex } = props;
  const buttons = ['About Me', 'Posts'];
  const theme = useContext(ThemeContext);
  return (
    <Container>
      <ButtonGroup
        selectedIndex={index}
        buttons={buttons}
        containerStyle={{
          borderRadius: 10,
          backgroundColor: theme.colors.paper,
        }}
        buttonStyle={{ backgroundColor: theme.colors.paper }}
        selectedButtonStyle={{
          backgroundColor: theme.colors.secondary,
          borderRadius: 10,
        }}
        innerBorderStyle={{ width: 0 }}
        onPress={handleSetButtonIndex}
      />
    </Container>
  );
};

export default ButtonGroupFeed;
