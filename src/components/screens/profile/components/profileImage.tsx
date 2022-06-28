import React, { useContext, useEffect } from 'react';
import { Dimensions, Image, View } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { SharedElement } from 'react-navigation-shared-element';
import { Button, Icon, Text } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import NavigationIcon from '../../../../library/navigationIcon';

interface ProfileImageProps {
  scale: Animated.SharedValue<number>;
  id: string;
  isNotMyProfile: boolean;
  firstname?: string;
  lastname?: string;
  location?: string;
  uri?: string;
}

interface OverlayImageProps {
  isNotMyProfile: boolean;
  firstname?: string;
  lastname?: string;
  location?: string;
}

const { width, height } = Dimensions.get('window');

const IMAGE_HEIGHT = height > 1100 ? 800 : 500;
const OVERLAY_HEIGHT =
  height > 900 && width > 400 ? IMAGE_HEIGHT / 4 : IMAGE_HEIGHT / 3.4;
const BUTTON_WIDTH = width * 0.2;
const BUTTON_HEIGHT = 35;

const OverlayContainer = styled(LinearGradient).attrs(() => ({
  colors: ['rgba(89, 92, 106, 0.2)', 'rgba(89, 92, 106, 0.8)'],
}))`
  height: ${OVERLAY_HEIGHT}px;
  margin-top: -${OVERLAY_HEIGHT}px;
  border-width: 0px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  padding-left: ${props => props.theme.spacing * 4}px;
  padding-right: ${props => props.theme.spacing * 4}px;
  padding-top: ${props => props.theme.spacing}px;
`;

const NameContainer = styled.View`
  flex: 1;
`;

const HeaderText = styled(Text).attrs(() => ({
  h4: true,
}))`
  color: #fff;
  font-family: ${props => props.theme.font.heading};
  text-transform: capitalize;
`;

const NavigationIconView = styled.View`
  flex-direction: row;
  position: absolute;
  align-self: flex-end;
  align-items: flex-end;
  justify-content: flex-end;
  background-color: rgba(89, 92, 106, 0.1);
  border-width: 0px;
  width: ${width}px;
  height: 85px;
`;

const AddressText = styled(Text)`
  font-size: ${height / 70}px;
  color: #fff;
  margin-top: 6px;
  margin-left: 3px;
  font-family: ${props => props.theme.font.subHeading};
`;

const AnimatedContainer = Animated.createAnimatedComponent(OverlayContainer);

const ImageOverlay: React.FunctionComponent<OverlayImageProps> = props => {
  const { firstname, lastname, location, isNotMyProfile } = props;
  const name = `${firstname} ${lastname}`;
  const isLengthOverSized = name?.length > 20;
  const theme = useContext(ThemeContext);
  const opacity = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value, {
      duration: 1500,
    }),
  }));

  useEffect(() => {
    opacity.value = 1;
  }, [opacity]);

  return (
    <AnimatedContainer style={animatedStyles}>
      <RowContainer>
        <NameContainer>
          <HeaderText>
            {isLengthOverSized ? `${name.slice(0, 20)}...` : name}
          </HeaderText>
          <View style={{ flexDirection: 'row' }}>
            <Icon
              name="room"
              type="material"
              size={13}
              color="lightgreen"
              style={{ marginTop: 6 }}
            />
            <AddressText>{location}</AddressText>
          </View>
        </NameContainer>
        {isNotMyProfile && (
          <Button
            buttonStyle={{
              backgroundColor: theme.colors.secondary,
              borderRadius: 10,
              height: BUTTON_HEIGHT,
              width: BUTTON_WIDTH,
              shadowOpacity: 0.2,
              shadowOffset: { width: 1, height: 1 },
              shadowColor: '#fff',
              shadowRadius: 10,
            }}
            icon={
              <Icon
                name="heart"
                type="font-awesome-5"
                size={10}
                color="white"
                style={{ marginRight: 5 }}
              />
            }
            title="Match"
            titleStyle={{ fontSize: 12 }}
            containerStyle={{
              height: BUTTON_HEIGHT,
              width: BUTTON_WIDTH,
              borderRadius: 10,
            }}
          />
        )}
      </RowContainer>
    </AnimatedContainer>
  );
};

const ProfileImage: React.FunctionComponent<ProfileImageProps> = props => {
  const { uri, scale, id, ...rest } = props;

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scale.value,
            [-height, 0],
            [5, 1],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <View>
      <Animated.View style={stylez}>
        <SharedElement id={id}>
          <Image
            source={{ uri: uri as string }}
            style={{
              width,
              height: IMAGE_HEIGHT,
              borderRadius: 0,
            }}
          />
        </SharedElement>

        {!rest.isNotMyProfile && (
          <NavigationIconView>
            <NavigationIcon route="EditProfile" icon="user-edit" isWhite />
            <NavigationIcon route="UpdateImages" icon="camera" isWhite />
            <NavigationIcon route="Settings" icon="cog" isWhite />
          </NavigationIconView>
        )}
      </Animated.View>
      <ImageOverlay {...rest} />
    </View>
  );
};

export default ProfileImage;
