import React, { useContext, useMemo } from 'react';
import { View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import styled, { ThemeContext } from 'styled-components/native';
import Interests from '../../../components/screens/initialWizard/components/interests';
import Spiritualties from '../../../components/screens/initialWizard/components/spirtualities';

export interface ChipsProps {
  text: string;
  overrideDefault?: boolean;
  icon?: string;
}
const Container = styled.TouchableOpacity<{ backgroundColor: string }>`
  flex-direction: row;
  align-self: flex-start;
  background-color: ${props => props.backgroundColor};
  padding: 10px;
  border-radius: 15px;
  margin: ${props => props.theme.spacing / 2}px;
`;

const StyledText = styled(Text)`
  text-align: center;
  font-size: 12px;
  padding-left: ${props => props.theme.spacing * 2}px;
  font-family: ${props => props.theme.font.Raleway};
  padding-right: ${props => props.theme.spacing * 2}px;
`;

const ChipsNonClickable: React.FunctionComponent<ChipsProps> = props => {
  const { text, overrideDefault, icon } = props;

  const theme = useContext(ThemeContext);

  const allChips = useMemo(() => [...Interests, ...Spiritualties], []);
  const foundChip = useMemo(() => allChips.find(chip => chip.text === text), [
    allChips,
    text,
  ]);

  if (overrideDefault)
    return (
      <Container backgroundColor={theme.colors.background}>
        <View style={{ flexDirection: 'row' }}>
          {icon && (
            <Icon
              type="font-awesome-5"
              name={icon}
              color={theme.colors.secondaryAlt}
              size={14}
            />
          )}
          <StyledText>{text}</StyledText>
        </View>
      </Container>
    );
  if (foundChip)
    return (
      <Container backgroundColor={theme.colors.background}>
        <View style={{ flexDirection: 'row' }}>
          <Icon
            type="font-awesome-5"
            name={foundChip.icon}
            color={theme.colors.secondaryAlt}
            size={14}
          />
          <StyledText>{foundChip.text}</StyledText>
        </View>
      </Container>
    );
  return null;
};

export default ChipsNonClickable;
