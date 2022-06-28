/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import styled, { ThemeContext } from 'styled-components/native';
import { StyledDivider, StyledListItem } from '../../../../../library/ui';
import { ProfileScreenNavigationProp } from '../../../../../screens/profile';
import { FormElements } from '../../../initialWizard/initialWizard';
import EditProfileObj from './editProfileObject';

export interface UpdateFieldProps {
  name: FormElements;
  whichType:
    | 'string'
    | 'multiline-string'
    | 'number'
    | 'location'
    | 'picker'
    | 'chips'
    | 'lookingFor'
    | 'preference'
    | 'gender';
  displayName: string;
}

const Container = styled.ScrollView`
  flex: 1;
`;

const SectionText = styled(Text)`
  font-size: 18px;
  font-family: ${props => props.theme.font.subHeading};
  margin-top: ${props => props.theme.spacing * 2}px;
  padding-bottom: ${props => props.theme.spacing * 2}px;
  margin-left: ${props => props.theme.spacing}px;
  color: ${props => props.theme.colors.secondary};
`;

const EditProfile = () => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const onPress = ({
    name,
    whichType,
    displayName,
  }: UpdateFieldProps) => () => {
    navigation.navigate('UpdateField', {
      name,
      whichType,
      displayName: `Update ${displayName}`,
    });
  };
  return (
    <Container>
      <SectionText>Select a field to edit</SectionText>
      {Object.values(EditProfileObj).map(
        ({ displayName, name, whichType }, key) => (
          <View key={key} style={{ flex: 1 }}>
            <StyledListItem
              {...{
                onPress: onPress({
                  // @ts-ignore
                  name,
                  whichType,
                  displayName,
                }),
              }}
            >
              <ListItem.Content>
                <ListItem.Title style={{ fontFamily: theme.font.subHeading }}>
                  {displayName}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </StyledListItem>

            <StyledDivider />
          </View>
        ),
      )}
    </Container>
  );
};

export default EditProfile;
