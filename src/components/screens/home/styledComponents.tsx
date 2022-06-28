import { Icon, Text } from 'react-native-elements';
import { Dimensions, Image } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('window');

export const StyledCardSwiper = styled.View`
  border-radius: 20px;
  border-width: 5px;
  background-color: blue; /* ${props => props.theme.colors.paper}; */
  flex: 0.65;
  align-self: center;
  width: ${width * 0.95}px;
`;

export const StyledCardNonSwiper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.paper};
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
  border-top-left-radius: ${props => props.radiusRound};
  border-top-right-radius: ${props => props.radiusRound};
  justify-content: center;
  width: ${props => props.windowWidth};
  height: ${props => props.imageHeight}; /* should be 500px or 300px */
`;

export const EvenlySpacedContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const SwiperIcon = styled(Icon)<{ color: string }>`
  color: ${props => props.color};
`;

export const SwiperView = styled.View.attrs(() => ({
  shadowOffset: { width: 2, height: 2 },
  shadowColor: '#000',
  shadowOpacity: 0.2,
  elevation: 1,
}))``;

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
  margin-top: ${height / 85}px;
`;

export const AddressText = styled(Text)`
  font-size: ${height / 60}px;
  margin-top: -2px;
  font-weight: 200;
`;

export const NameText = styled(Text)`
  font-weight: 600;
  font-family: ${props => props.theme.font.subHeading};
  font-size: ${height / 40}px;
`;

export const CardInfoBanner = styled.View`
  justify-content: center;
  padding-left: ${props => props.theme.spacing}px;
  background-color: ${props => props.theme.colors.paper};
  border-radius: 20px;
  border-color: ${props => props.theme.colors.background};
  border-top-right-radius: 0px;
  border-top-left-radius: 0px;
`;

export const HeaderDesignView = styled(LinearGradient).attrs(props => ({
  colors: [props.theme.colors.primary, props.theme.colors.primaryAlt],
}))`
  overflow: hidden;

  height: 344px;
  border-bottom-right-radius: 39px;
  border-bottom-left-radius: 39px;
`;

export const HeaderDesignViewWrapper = styled.View`
  overflow: hidden;
  height: 344px;
  border-bottom-right-radius: 39px;
  border-bottom-left-radius: 39px;
`;

export const AboutContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const BannerContainer = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-around;
  align-items: center;
`;

export const RalewayH4TextWhite = styled(Text).attrs(() => ({
  h4: true,
}))`
  color: #ffffff;
  text-align: center; /*  */
  font-family: ${props => props.theme.font.Raleway};
`;

export const RalewayTextWhite = styled(Text)`
  color: #ffffff;
  text-align: center;
  font-family: ${props => props.theme.font.subHeading};
`;

export const BlockUserContainer = styled.View`
  flex-direction: row;
  margin-top: ${props => props.theme.spacing * 2}px;
  justify-content: center;
`;
