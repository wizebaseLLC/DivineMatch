import { Icon, Text } from 'react-native-elements';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';

export const StyledCardSwiper = styled.View`
  flex: 0.7;
  border-radius: 13px;
`;

export const StyledCardNonSwiper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.paper};
  padding-bottom: ${props => props.theme.spacing * 2}px;
  border-width: 0;
`;

export const CardBanner = styled(LinearGradient).attrs(props => ({
  colors: [props.theme.colors.primary, props.theme.colors.secondary],
}))`
  height: 100px;
`;

export const StyledCardImage = styled(Image)<{
  radiusRound: string;
  imageHeight: string;
  windowWidth: string;
}>`
  border-radius: ${props => props.radiusRound}; /* should be 13px or 0px */
  justify-content: center;
  width: ${props => props.windowWidth};
  height: ${props => props.imageHeight}; /* should be 500px or 300px */
`;

export const EvenlySpacedContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const SwiperIcon = styled(Icon)<{ color: string }>`
  color: ${props => props.color};
`;

export const SwiperView = styled.View.attrs(() => ({
  shadowOffset: { width: 2, height: 2 },
  shadowColor: '#000',
  shadowOpacity: 0.2,
  elevation: 1,
}))`
  margin-top: -100px;
`;

export const HeaderText = styled(Text).attrs(() => ({
  h2: true,
}))`
  color: #fff;
  padding-left: ${props => props.theme.spacing}px;
  font-family: ${props => props.theme.font.subHeading};
  margin-top: -${props => props.theme.spacing}px;
`;

export const HeaderTextNoColor = styled(Text).attrs(() => ({
  h2: true,
}))`
  padding-left: ${props => props.theme.spacing}px;
  font-family: ${props => props.theme.font.subHeading};
  margin-top: -${props => props.theme.spacing}px;
`;

export const OnlineCircle = styled.View`
  height: 10px;
  width: 10px;
  border-radius: 20px;
  background-color: lightgreen;
  margin-left: 5px;
  margin-top: 12px;
`;

export const AddressText = styled(Text)`
  font-size: 15px;
  margin-top: -2px;
  font-weight: 200;
`;

export const NameText = styled(Text)`
  font-weight: 600;
  font-family: ${props => props.theme.font.subHeading};
  font-size: 25px;
`;

export const CardInfoBanner = styled.View`
  position: relative;
  padding: 10px;
  top: -70px;
  background-color: ${props => props.theme.colors.paper};
  border-radius: 13px;
`;

export const HeaderDesignView = styled(LinearGradient).attrs(props => ({
  colors: [props.theme.colors.primary, props.theme.colors.secondary],
}))`
  overflow: hidden;
  height: 344px;
  border-bottom-right-radius: 39px;
  border-bottom-left-radius: 39px;
`;

export const HeaderDesignViewWrapper = styled.View`
  overflow: hidden;
  border-bottom-right-radius: 39px;
  border-bottom-left-radius: 39px;
`;

export const AboutContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-left: ${props => props.theme.spacing * 2}px;
`;

export const BannerContainer = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-around;
  align-items: center;
`;

export const RalewayH4TextWhite = styled(Text).attrs(() => ({}))`
  color: #2a2e43;
  opacity: 0.8;
  font-size: 18px;
  text-align: center;
  font-family: ${props => props.theme.font.RalewayBoldItalic};
  text-transform: capitalize;
`;

export const RalewayTextWhite = styled(Text)`
  font-size: 12px;
  color: #2a2e43;
  opacity: 0.8;
  text-align: center;
  font-family: ${props => props.theme.font.subHeading};
`;

export const BlockUserContainer = styled.View`
  flex-direction: row;
  margin-top: ${props => props.theme.spacing * 2}px;
  justify-content: center;
`;

export const ProfileSectionHeaderText = styled(Text)`
  font-size: 18px;
  font-family: ${props => props.theme.font.heading};
`;

export const ProfileSectionText = styled(Text)`
  font-size: 14px;
  font-family: ${props => props.theme.font.normal};
`;
