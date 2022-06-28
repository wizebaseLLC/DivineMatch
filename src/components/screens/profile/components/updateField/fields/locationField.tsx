/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useToast } from 'react-native-styled-toast';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, View } from 'react-native';
import { Text } from 'react-native-elements';
import {
  GooglePlaceData,
  GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';
import { UpdateFieldScreenNavigationProp } from '../../../../../../screens/profile';
import SubmitButton from '../ui/submitButton';
import { onSubmitLocation } from '../onSubmit';
import LocationAutoComplete from '../../../../../../library/locationAutoComplete';
import {
  useMyProfileQuery,
  useUpdateUserMutation,
} from '../../../../../../generated/generated';
import { mutationUserUpdate } from './stringField';

const { width } = Dimensions.get('window');

interface LocationFieldProps {
  currentLocation: string | undefined;
}

const Container = styled.View`
  background-color: ${props => props.theme.colors.paper};
  flex: 1;
`;

const ButtonContainer = styled.View`
  margin-top: ${props => props.theme.spacing * 2}px;
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

const LocationField: React.FunctionComponent<LocationFieldProps> = props => {
  const { currentLocation } = props;
  const { toast } = useToast();
  const { data: userData } = useMyProfileQuery();
  const [mutateUser] = useUpdateUserMutation();
  const navigation = useNavigation<UpdateFieldScreenNavigationProp>();
  const theme = useContext(ThemeContext);

  const schema = Yup.object({
    location: Yup.string().required('Required'),
    longitude: Yup.string().required('Required'),
    latitude: Yup.string().required('Required'),
  });

  const initialValues = {
    longitude: '',
    latitude: '',
    location: '',
  };

  const handleInputChange = (handleChange: any) => (
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
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      enableReinitialize
      onSubmit={onSubmitLocation({
        goBack: navigation.goBack,
        mutation: mutationUserUpdate(userData, mutateUser),
        toast,
      })}
    >
      {({ values, handleSubmit, isSubmitting, handleChange }) => {
        return (
          <Container>
            <View style={{ paddingBottom: theme.spacing * 2 }} />
            <SubheaderText color="">
              Current location: {currentLocation}
            </SubheaderText>
            <LocationAutoComplete
              {...{
                handleInputChange: handleInputChange(handleChange),
              }}
            />
            {values.location ? (
              <>
                <SubheaderText color={theme.colors.secondaryAlt}>
                  We will display your location as: {values.location}
                </SubheaderText>
                <SubheaderText color={theme.colors.fontColor}>
                  If this is too descriptive, choose a less exact location
                </SubheaderText>
              </>
            ) : null}
            <ButtonContainer>
              <SubmitButton
                handleSubmit={handleSubmit as () => void}
                isSubmitting={isSubmitting}
              />
            </ButtonContainer>
          </Container>
        );
      }}
    </Formik>
  );
};

export default LocationField;
