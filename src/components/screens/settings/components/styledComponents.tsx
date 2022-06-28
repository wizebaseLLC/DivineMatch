import { Dimensions, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';

import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

export const Container = styled.View``;

export const StyledCard = styled.View.attrs(() => ({
  shadowOffset: { width: 2, height: 2 },
  shadowColor: '#000',
  shadowOpacity: 0.4,
}))<{ isDark: boolean }>`
  margin-top: ${props => props.theme.spacing}px;
  width: ${width * 0.96}px;
  padding: ${props => props.theme.spacing}px;

  border-radius: 10px;
  align-items: center;
  background-color: ${props => props.theme.colors.paper};
`;

export const BannerText = styled(Text)`
  font-size: 24px;
  font-family: ${props => props.theme.font.heading};
  padding-left: ${props => props.theme.spacing}px;
`;

export const DivineMatchBanner = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: ${props => props.theme.spacing / 2}px;
`;

export const DescriptionText = styled(Text)`
  font-size: 14px;
  font-family: ${props => props.theme.font.light};
`;

export const StyledMiniCard = styled.View`
  margin-top: ${props => props.theme.spacing}px;
`;

export const DivineMatchMiniBanner = styled.View.attrs(
  (props: { isDark: boolean }) =>
    !props.isDark
      ? {
          shadowOffset: { width: 2, height: 2 },
          shadowColor: '#000',
          shadowOpacity: 0.4,
        }
      : undefined,
)<{ isDark: boolean }>`
  align-items: center;
  border-radius: 10px;
  width: ${width * 0.47}px;
  background-color: ${props => props.theme.colors.paper};
  padding-bottom: ${props => props.theme.spacing / 2}px;
`;

export const DivineMatchMiniBannerTouch = styled(TouchableOpacity)`
  align-items: center;
  border-radius: 10px;
  width: ${width * 0.46}px;
  background-color: ${props => props.theme.colors.paper};
  padding: ${props => props.theme.spacing / 2}px;
`;
