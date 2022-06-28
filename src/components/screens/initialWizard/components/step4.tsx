import React, { useContext } from 'react';
import { Dimensions, Image, View } from 'react-native';
import { Text } from 'react-native-elements';
import styled, { ThemeContext } from 'styled-components/native';
import {
  GooglePlaceData,
  GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';
import { FormProps } from '../initialWizard';
import LocationAutoComplete from '../../../../library/locationAutoComplete';

const { width } = Dimensions.get('window');
interface Props {
  formProps: FormProps;
}

const Container = styled.View`
  background-color: ${props => props.theme.colors.paper};
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

const SubheaderText = styled(Text)<{ color: string }>`
  font-size: 15px;
  font-family: ${props => props.theme.font.heading};
  padding-left: ${props => props.theme.spacing / 2}px;
  max-width: ${width * 0.8}px;
  padding: ${props => props.theme.spacing}px;
  align-self: center;
  margin-top: ${props => props.theme.spacing}px;
  color: ${props => props.color || props.theme.colors.actionBlue};
`;

const ErrorText = styled(Text)`
  font-size: 15px;
  font-family: ${props => props.theme.font.heading};
  padding-left: ${props => props.theme.spacing / 2}px;
  max-width: ${width * 0.8}px;
  padding: ${props => props.theme.spacing}px;
  align-self: center;
  margin-top: ${props => props.theme.spacing}px;
  color: ${props => props.theme.colors.error};
`;

const LogoImage = styled(Image)`
  height: 70px;
  width: 70px;
  align-self: center;
`;

const Step4: React.FunctionComponent<Props> = props => {
  const { formProps } = props;
  const { handleChange, values } = formProps;
  const theme = useContext(ThemeContext);

  const handleInputChange = (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null,
  ) => {
    handleChange('location')(data?.structured_formatting?.secondary_text);
    handleChange('longitude')(
      details?.geometry?.location?.lng.toString() as string,
    );
    handleChange('latitude')(
      details?.geometry?.location?.lat.toString() as string,
    );
  };

  return (
    <Container>
      <LogoImage source={require('../../../../../assets/images/icon.png')} />
      <HeaderText>Where are you Located?</HeaderText>
      <SubheaderText color="">Help us narrow your dating pool</SubheaderText>
      <View style={{ paddingBottom: theme.spacing * 2 }} />
      <LocationAutoComplete {...{ handleInputChange }} />
      {!values.location && <ErrorText>This section is required</ErrorText>}
      {values.location ? (
        <>
          <SubheaderText color="">
            We will display your location as: {values.location}
          </SubheaderText>
          <SubheaderText color={theme.colors.fontColor}>
            If this is too descriptive, choose a less exact location
          </SubheaderText>
        </>
      ) : null}
    </Container>
  );
};

export default Step4;
