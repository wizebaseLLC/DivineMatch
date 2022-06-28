import React, { useContext } from 'react';
import { Dimensions, useColorScheme } from 'react-native';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import { ThemeContext } from 'styled-components/native';

const { width } = Dimensions.get('window');

interface LocationAutoCompleteProps {
  handleInputChange: (
    data: GooglePlaceData,
    detail: GooglePlaceDetail | null,
  ) => void;
}

const LocationAutoComplete: React.FunctionComponent<LocationAutoCompleteProps> = props => {
  const { handleInputChange } = props;
  const theme = useContext(ThemeContext);
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return (
    <GooglePlacesAutocomplete
      placeholder="Search Location"
      onPress={handleInputChange}
      minLength={2}
      debounce={300}
      fetchDetails
      enablePoweredByContainer={false}
      query={{
        key: 'AIzaSyAtOrLOYW2NHnkqS6oYU6VzCJ3b1Opeqnw', // #TODO Change this key before moving github repo to prod
        language: 'en',
      }}
      /*       currentLocation
      currentLocationLabel="Detect Current Location" */
      styles={{
        /*     container: { flex: 0.5 }, */
        predefinedPlacesDescription: {
          color: theme.colors.actionBlue,
          marginLeft: theme.spacing * 2,
          fontSize: 16,
        },
        textInputContainer: {
          justifyContent: 'center',
          marginTop: theme.spacing * 2,
        },
        row: {
          backgroundColor: theme.colors.paper,
        },
        description: { color: theme.colors.fontColor },
      }}
      textInputProps={{
        placeholderTextColor: theme.colors.fontColor,
        style: {
          color: theme.colors.fontColor,
          width: width * 0.9,
          paddingLeft: 15,
          backgroundColor: isDark ? 'rgb(50,50,50)' : theme.colors.background,
          borderRadius: 20,
          height: 50,
        },

        errorStyle: { color: 'red' },
      }}
    />
  );
};

export default LocationAutoComplete;
