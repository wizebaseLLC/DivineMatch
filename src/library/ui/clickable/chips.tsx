import React, { useContext } from 'react';
import { View } from 'react-native';
import { Icon, Text } from 'react-native-elements';

import styled, { ThemeContext } from 'styled-components/native';

export interface ChipsProps {
  text: string;
  selected: boolean;
  onPress: () => void;
  icon?: string;
  index?: number;
}

const Container = styled.TouchableOpacity<{ backgroundColor: string }>`
  flex-direction: row;
  align-self: flex-start;
  background-color: ${props => props.backgroundColor};
  padding: 8px;
  border-radius: 15px;
  margin: ${props => props.theme.spacing / 2}px;
`;

const StyledText = styled(Text)`
  text-align: center;
  padding-left: ${props => props.theme.spacing * 2}px;
  font-family: ${props => props.theme.font.Raleway};
  padding-right: ${props => props.theme.spacing * 2}px;
`;

const Chips: React.FunctionComponent<ChipsProps> = props => {
  const { icon, text, onPress, selected } = props;

  const theme = useContext(ThemeContext);

  return (
    <Container
      onPress={onPress}
      backgroundColor={
        selected ? theme.colors.secondaryAlt : theme.colors.background
      }
    >
      <View style={{ flexDirection: 'row' }}>
        {icon && (
          <Icon
            type="font-awesome-5"
            name={icon}
            color={selected ? '#fff' : theme.colors.secondaryAlt}
            size={18}
          />
        )}
        <StyledText>{text}</StyledText>
        {selected && (
          <Icon
            type="font-awesome-5"
            name="check"
            color={selected ? '#fff' : theme.colors.secondaryAlt}
            size={18}
          />
        )}
      </View>
    </Container>
  );
};

export default Chips;
