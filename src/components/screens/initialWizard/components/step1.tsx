import React from 'react';
import { Dimensions, Image, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import styled from 'styled-components/native';
import Animated, {
  withDelay,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import InputComponentDM from './inputComponent';
import { FormProps } from '../initialWizard';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const Container = styled(KeyboardAwareScrollView)`
  width: ${width}px;
  background-color: ${props => props.theme.colors.paper};
`;

const HeaderText = styled(Text).attrs(() => ({
  h3: true,
}))`
  font-family: ${props => props.theme.font.heading};
  padding-left: ${props => props.theme.spacing / 2}px;
  max-width: ${width}px;
  padding: ${props => props.theme.spacing}px;
  align-self: center;
  margin-top: ${props => props.theme.spacing}px;
`;

const SubheaderText = styled(Text)`
  font-size: 17px;
  color: ${props => props.theme.colors.secondary};
  font-family: ${props => props.theme.font.subHeading};
  padding-left: ${props => props.theme.spacing / 2}px;
  max-width: ${width * 0.8}px;
  padding: ${props => props.theme.spacing}px;
  align-self: center;
  margin-top: ${props => props.theme.spacing}px;
`;

const SubheaderText2 = styled(Text).attrs(() => ({}))`
  font-size: 16px;
  color: ${props => props.theme.colors.secondary};
  font-family: ${props => props.theme.font.normal};
  padding-left: ${props => props.theme.spacing / 2}px;
  max-width: ${width * 0.8}px;
  padding: ${props => props.theme.spacing}px;
  align-self: center;
  margin-top: ${props => props.theme.spacing}px;
`;

const LogoImage = styled(Image)`
  height: 70px;
  width: 70px;
  align-self: center;
`;

const AnimatedSubheaderText = Animated.createAnimatedComponent(SubheaderText);
const AnimatedSubheaderText2 = Animated.createAnimatedComponent(SubheaderText2);

interface Step2Props {
  formProps: FormProps;
}

const Step1: React.FunctionComponent<Step2Props> = props => {
  const { formProps } = props;

  const animatedSubHeaderHeader = useSharedValue(height * 0.8);
  const animatedSubHeader2Header = useSharedValue(height * 0.8);
  const animatedInputOpacity = useSharedValue(0);

  React.useEffect(() => {
    animatedSubHeaderHeader.value = withDelay(500, withSpring(0));
    animatedSubHeader2Header.value = withDelay(1500, withSpring(0));
    animatedInputOpacity.value = withDelay(
      2000,
      withTiming(1, { duration: 2000 }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SubHeaderStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: animatedSubHeaderHeader.value,
      },
    ],
  }));

  const SubHeaderStyle2 = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: animatedSubHeader2Header.value,
      },
    ],
  }));

  const InputStyle = useAnimatedStyle(() => ({
    opacity: animatedInputOpacity.value,
  }));

  return (
    <Container>
      <ScrollView style={{ alignContent: 'center' }}>
        <LogoImage source={require('../../../../../assets/images/icon.png')} />
        <HeaderText>Welcome to Divine Match</HeaderText>
        <AnimatedSubheaderText style={SubHeaderStyle}>
          Before searching for your next Divine Match...
        </AnimatedSubheaderText>
        <AnimatedSubheaderText2 style={SubHeaderStyle2}>
          Please take a brief moment to introduce yourself
        </AnimatedSubheaderText2>

        <Animated.View style={InputStyle}>
          <InputComponentDM
            {...{
              element: 'firstname',
              formProps,
              iconName: 'user',
              placeholder: 'Enter your first name',
              label: 'First Name',
              marginTopMultiplier: 5,
            }}
          />
          <InputComponentDM
            {...{
              element: 'lastname',
              formProps,
              iconName: 'user',
              placeholder: 'Enter your last name',
              label: 'Last Name',
              marginTopMultiplier: 2,
            }}
          />
        </Animated.View>
      </ScrollView>
    </Container>
  );
};

export default Step1;
