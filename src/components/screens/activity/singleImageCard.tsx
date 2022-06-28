import React from 'react';
import { Dimensions, TouchableOpacity, View, Image } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface Props {
  images: Array<{ uri: string }>;
  setImageVisible: (index: number) => () => void;
}

const SingleImageCard = ({ images, setImageVisible }: Props) => {
  return (
    <View style={{ marginLeft: -15, width: windowWidth }}>
      <TouchableOpacity onPress={setImageVisible(0)} activeOpacity={0.8}>
        <Image
          source={{ uri: images?.[0]?.uri as string }}
          style={{
            width: windowWidth,
            borderRadius: 0,
            height: windowHeight / 2,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SingleImageCard;
