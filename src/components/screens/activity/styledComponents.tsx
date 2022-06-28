import { Video } from 'expo-av';
import { Dimensions } from 'react-native';
import { Button, Text } from 'react-native-elements';

import styled from 'styled-components/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const NormalText = styled(Text)`
  font-family: ${props => props.theme.font.normal};
`;

export const WriterText = styled(Text)`
  font-family: ${props => props.theme.font.subHeading};
`;

export const FatText = styled(Text)`
  font-family: ${props => props.theme.font.normal};
  font-size: 20px;
`;

export const HeadingText = styled(Text)`
  font-family: ${props => props.theme.font.subHeading};
  font-size: 16px;
  align-self: flex-start;
  margin-left: ${props => props.theme.spacing}px;
`;
export const LightText = styled(Text)`
  font-family: ${props => props.theme.font.light};
  font-size: 12px;
  align-self: flex-start;
  margin-left: ${props => props.theme.spacing}px;
`;

export const EllipseView = styled.View`
  justify-content: flex-end;
  flex-direction: row;
  position: absolute;
  top: 0;
  right: 0;
  padding: ${props => props.theme.spacing}px;
`;

export const CardHeading = styled.View`
  margin-top: ${props => props.theme.spacing}px;
  padding-bottom: ${props => props.theme.spacing}px;
  flex-direction: row;
`;

export const LikeCommentCountView = styled.View`
  justify-content: space-around;
  flex-direction: row;
  height: 40px;
  align-items: center;
  width: ${windowWidth}px;
  border-bottom-width: 1px;
  border-color: ${props => props.theme.colors.paper};
  margin-left: -15px;
`;

export const CardActionView = styled.View`
  padding-top: ${props => props.theme.spacing}px;
  height: 45px;
  margin-left: -15px;
  width: ${windowWidth}px;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
`;

export const StyledInteractButton = styled(Button).attrs(props => ({
  titleStyle: {
    marginLeft: props.theme.spacing,
    color: props.theme.colors.secondaryAlt,
    fontFamily: props.theme.font.normal,
    fontSize: 17,
    height: '100%',
  },
  type: 'clear',
  style: { height: '100%' },
}))``;

export const BottomSheetView = styled.View`
  background-color: ${props => props.theme.colors.paper};
  height: 100%;
  border: none;
`;
export const BottomSheetHeaderBar = styled.View`
  height: 8px;
  width: 50px;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.bottomSheetBar};
  position: relative;
  top: -39px;
`;

export const BottomSheetHeaderTopEdges = styled.View.attrs(props => ({
  shadowColor: props.theme.colors.bottomSheetShadow,
  shadowOffset: { width: -1, height: -3 },
  shadowRadius: 2,
  shadowOpacity: 0.3,
}))`
  background-color: ${props => props.theme.colors.paper};
  padding-top: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-top: 20px;
`;

export const StyledVideo = styled(Video)`
  width: ${windowWidth}px;
  height: ${windowHeight / 2}px;
  margin-left: -15px;
`;
