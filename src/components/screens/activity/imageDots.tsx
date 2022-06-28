/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Maybe } from 'graphql/jsutils/Maybe';
import React from 'react';
import { View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import { PostMedia } from '../../../generated/generated';

const StyledDots = styled(Animated.View)`
  top: -10px;
  width: 8px;
  margin-left: 3px;
  margin-right: 3px;
  height: 8px;
  border-radius: 4px;
`;

interface ImageDotsProps {
  media: Maybe<PostMedia[]> | undefined;
  dotIndex: Animated.SharedValue<number>;
  marginTop: number;
}

interface DotsProps {
  index: number;
  dotIndex: Animated.SharedValue<number>;
}

const Dots: React.FunctionComponent<DotsProps> = props => {
  const { index, dotIndex } = props;

  const derivedDotIndex = useDerivedValue(() => {
    const before = index - 1;
    const after = index + 1;

    return interpolate(
      dotIndex.value,
      [before, index, after],
      [0.3, 1, 0.3],
      Extrapolate.CLAMP,
    );
  });

  const derivedDotColor = useDerivedValue(() => {
    const before = index - 1;
    const after = index + 1;

    return interpolateColor(
      dotIndex.value,
      [before, index, after],
      // @ts-ignore
      [0xff2a2a2c, 0xff0b2c5a, 0xff2a2a2c], // #TODO FIX THIS AFTER UPDATE
    );
  });
  const style = useAnimatedStyle(
    () => ({
      opacity: derivedDotIndex.value,
      backgroundColor: derivedDotColor.value as string,
    }),
    [index],
  );

  return <StyledDots key={index} style={style} />;
};

const ImageDots: React.FunctionComponent<ImageDotsProps> = props => {
  const { media, dotIndex, marginTop } = props;
  return (
    <View
      style={{
        justifyContent: 'center',
        alignContent: 'center',
        marginTop,
        flexDirection: 'row',
      }}
    >
      {media?.map((_, index) => (
        <Dots
          {...{
            dotIndex,
            index,
            key: index,
          }}
        />
      ))}
    </View>
  );
};

export default ImageDots;
