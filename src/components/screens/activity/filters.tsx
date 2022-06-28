import React, { useContext, useState } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import { ThemeContext } from 'styled-components';
import styled from 'styled-components/native';

const BUTTON_WIDTH = 75;

export const Container = styled.View`
  padding-left: ${props => props.theme.spacing}px;
  padding-bottom: ${props => props.theme.spacing}px;
  background-color: ${props => props.theme.colors.background};
`;

export const ButtonContainer = styled.View`
  width: ${BUTTON_WIDTH}px;
`;

export const StyledTouchable = styled(TouchableOpacity)`
  align-items: center;
  height: 35px;
  justify-content: center;
`;

export const ButtonText = styled(Text)<{ fontColor: string }>`
  font-family: ${props => props.theme.font.Raleway};
  font-size: 14px;
  color: ${props => props.fontColor};
`;

const buttons = ['Near You', 'Matches', 'Popular', 'Favorites', 'Online'];

export const FilterGroup = () => {
  const [selected, setSelected] = useState(0);
  const theme = useContext(ThemeContext);
  const updateIndex = (selectedIndex: number) => () => {
    setSelected(selectedIndex);
  };

  const bottomIndicator = useDerivedValue(() =>
    withSpring(selected * BUTTON_WIDTH),
  );

  const bottomIndicatorStyle = useAnimatedStyle(() => {
    return {
      left: bottomIndicator.value,
    };
  });

  return (
    <Container>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {buttons.map((button, index) => {
          const isSelected = selected === index;
          return (
            <ButtonContainer key={index}>
              <StyledTouchable onPress={updateIndex(index)}>
                <ButtonText
                  {...{
                    fontColor: isSelected
                      ? theme.colors.actionBlue
                      : theme.colors.text,
                  }}
                >
                  {button}
                </ButtonText>
              </StyledTouchable>
            </ButtonContainer>
          );
        })}
        <Animated.View
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              top: 30,
              height: 2,
              width: BUTTON_WIDTH,
              backgroundColor: theme.colors.actionBlue,
            },
            bottomIndicatorStyle,
          ]}
        />
      </ScrollView>
    </Container>
  );
};
