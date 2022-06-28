/* eslint-disable no-nested-ternary */
import React from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

interface ImageScrollerProps {
  setImageVisible: (index: number) => () => void;
  images: {
    uri: string | undefined;
    id: number;
  }[];
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: ${props => props.theme.spacing}px;
`;
const ImageScroller: React.FunctionComponent<ImageScrollerProps> = props => {
  const { setImageVisible, images } = props;

  return (
    <Container>
      {images?.map(({ uri }, index, arr) => {
        const { length } = arr;
        const isOneImage = length === 1;
        const isThreeImage = length === 3;
        const width = isOneImage
          ? windowWidth * 0.95
          : isThreeImage && index === 0
          ? windowWidth
          : windowWidth / 2.2;
        const imageHeight =
          index === 0 || index === 3 ? windowHeight / 2.9 : windowHeight / 3.3;
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={setImageVisible(index)}
            key={index}
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              borderRadius: 10,
              padding: 8,
            }}
          >
            <Image
              source={{ uri: uri as string }}
              style={{
                width,
                height: imageHeight,

                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        );
      })}
    </Container>
  );
};

export default ImageScroller;
