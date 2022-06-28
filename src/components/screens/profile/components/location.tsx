import React, { useContext } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { ThemeContext } from 'styled-components';
import styled from 'styled-components/native';
import {
  ProfileSectionHeaderText,
  ProfileSectionText,
} from './styledComponents';

interface Props {
  location: string;
}
const IconView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledIcon = styled(Icon).attrs(props => ({
  name: 'map-marker-alt',
  type: 'font-awesome-5',
  color: props.theme.colors.success,
  size: 15,
}))`
  flex-direction: row;
  align-items: center;
  padding-right: ${props => props.theme.spacing}px;
`;

const Location: React.FC<Props> = props => {
  const { location } = props;
  const theme = useContext(ThemeContext);
  return (
    <View style={{ padding: theme.spacing }}>
      <ProfileSectionHeaderText>Location</ProfileSectionHeaderText>
      <IconView>
        <StyledIcon />

        <ProfileSectionText>{location}</ProfileSectionText>
      </IconView>
    </View>
  );
};

export default Location;
