import React, { useContext } from 'react';
import { Dimensions, Image, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import styled, { ThemeContext } from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';
import { FormProps } from '../initialWizard';

const { width } = Dimensions.get('window');

const Container = styled.ScrollView`
  width: ${width}px;
  background-color: ${props => props.theme.colors.paper};
`;

const PickerContainer = styled.View`
  width: ${width}px;
  flex-direction: row;
  justify-content: center;
`;

const PickerText = styled(Text).attrs(() => ({
  h3: true,
}))`
  width: ${width * 0.3}px;
  align-self: center;
`;

const StyledPicker = styled(Picker).attrs(() => ({}))`
  width: ${width * 0.6}px;
`;

const HeaderText = styled(Text).attrs(() => ({
  h4: true,
}))`
  font-family: ${props => props.theme.font.heading};
  padding-left: ${props => props.theme.spacing / 2}px;
  max-width: ${width}px;
  padding: ${props => props.theme.spacing}px;
  align-self: center;
  margin-top: ${props => props.theme.spacing}px;
`;

const LogoImage = styled(Image)`
  height: 70px;
  width: 70px;
  align-self: center;
`;
interface Step2Props {
  formProps: FormProps;
}

const arrayTo100 = Array.from(Array(100).keys()).filter(x => x > 17);

const Step2: React.FunctionComponent<Step2Props> = props => {
  const { formProps } = props;
  const { handleChange, values } = formProps;
  const theme = useContext(ThemeContext);

  const handleChangePicker = (formElement: keyof typeof values) => (
    text: React.ReactText,
  ) => {
    handleChange(formElement)(text.toString());
  };

  return (
    <Container>
      <ScrollView style={{ alignContent: 'center' }}>
        <LogoImage source={require('../../../../../assets/images/icon.png')} />
        <HeaderText>{`Hey There, ${values.firstname}`}</HeaderText>
        <PickerContainer>
          <PickerText>I am a </PickerText>
          <StyledPicker
            selectedValue={values.gender}
            onValueChange={handleChangePicker('gender')}
            prompt="Select Gender"
          >
            <Picker.Item
              label="Female"
              value="female"
              color={theme.colors.fontColor}
            />
            <Picker.Item
              label="Male"
              value="male"
              color={theme.colors.fontColor}
            />
            <Picker.Item
              label="Other"
              value="other"
              color={theme.colors.fontColor}
            />
          </StyledPicker>
        </PickerContainer>
        <PickerContainer>
          <PickerText>Age</PickerText>
          <StyledPicker
            selectedValue={values.age}
            onValueChange={handleChangePicker('age')}
            prompt="Select Age"
          >
            {arrayTo100.map((num, index) => (
              <Picker.Item
                key={index}
                label={num.toString()}
                value={num.toString()}
                color={theme.colors.fontColor}
              />
            ))}
          </StyledPicker>
        </PickerContainer>
      </ScrollView>
    </Container>
  );
};

export default Step2;
