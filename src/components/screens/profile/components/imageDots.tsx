import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

interface ImageDotsProps {
  images: {
    uri: string | undefined;
    id: number;
  }[];
  dotIndex: number;
}

const ImageDots: React.FunctionComponent<ImageDotsProps> = props => {
  const { images, dotIndex } = props;
  return (
    <View
      style={{
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: -10,
        flexDirection: 'row',
      }}
    >
      {images?.map((_, index) => (
        <Animated.View
          key={index}
          style={[
            {
              opacity: dotIndex === index ? 1 : 0.3,
              backgroundColor: 'white',
              top: -10,
              width: 8,
              marginLeft: 3,
              marginRight: 3,
              height: 8,
              borderRadius: 4,
            },
          ]}
        />
      ))}
    </View>
  );
};

export default ImageDots;
