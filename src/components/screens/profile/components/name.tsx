import React, { useContext } from 'react';
import { View } from 'react-native';
import { ThemeContext } from 'styled-components';
import {
  ProfileSectionHeaderText,
  ProfileSectionText,
} from './styledComponents';

interface Props {
  firstname: string;
  lastname: string;
}
const Name: React.FC<Props> = props => {
  const { firstname, lastname } = props;
  const theme = useContext(ThemeContext);
  return (
    <View>
      <View style={{ padding: theme.spacing }}>
        <ProfileSectionHeaderText>First Name</ProfileSectionHeaderText>
        <ProfileSectionText style={{ textTransform: 'capitalize' }}>
          {firstname}
        </ProfileSectionText>
      </View>
      <View style={{ padding: theme.spacing }}>
        <ProfileSectionHeaderText>Last Name</ProfileSectionHeaderText>
        <ProfileSectionText style={{ textTransform: 'capitalize' }}>
          {lastname}
        </ProfileSectionText>
      </View>
    </View>
  );
};

export default Name;
