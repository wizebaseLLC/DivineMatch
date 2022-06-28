import React, { useEffect, useMemo } from 'react';
import { Dimensions, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import { User } from '../../../generated/generated';
import {
  RalewayH4TextWhite,
  RalewayTextWhite,
} from './components/styledComponents';

const { width } = Dimensions.get('window');
const BANNER_HEIGHT = 100;

const Container = styled.View`
  flex-direction: row;
  height: ${BANNER_HEIGHT}px;
  justify-content: space-around;
  align-items: center;
  align-self: center;
  width: ${width * 0.85}px;
  padding-left: ${props => props.theme.spacing * 2}px;
  padding-right: ${props => props.theme.spacing * 2}px;
  background-color: #f7f7fa;
  border-radius: 10px;
  margin-top: -${BANNER_HEIGHT / 2}px;
`;

const RowAligned = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-around;
  align-items: center;
  align-self: center;
`;

const Divider = styled.View`
  background-color: #2a2e43;
  opacity: 0.16;
  width: 1px;
  height: 35px;
`;

interface Props {
  userData: User;
}

const AnimatedContainer = Animated.createAnimatedComponent(Container);
const BannerInfo: React.FC<Props> = React.memo(props => {
  const { userData } = props;
  const opacity = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value, {
      duration: 1500,
    }),
  }));

  useEffect(() => {
    opacity.value = 1;
  }, [opacity]);

  const info = useMemo(
    () => [
      { top: userData.age, bottom: 'Years old' },
      { top: userData.preference, bottom: 'Preferred' },
      { top: userData.lookingfor, bottom: 'Looking for' },
    ],
    [userData],
  );

  return (
    <AnimatedContainer style={animatedStyles}>
      {info.map((data, index) => (
        <RowAligned key={index}>
          <View>
            <RalewayH4TextWhite>{data.top}</RalewayH4TextWhite>
            <RalewayTextWhite>{data.bottom}</RalewayTextWhite>
          </View>
          {index < 2 && <Divider />}
        </RowAligned>
      ))}
    </AnimatedContainer>
  );
});

export default BannerInfo;
