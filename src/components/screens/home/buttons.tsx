import { debounce } from 'lodash';
import React from 'react';
import { Dimensions, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import {
  EvenlySpacedContainer,
  SwiperIcon,
  SwiperView,
} from './styledComponents';

const { height } = Dimensions.get('window');

interface Props {
  swipeBack: () => void;
  swipeLeft: () => void | undefined;
  swipeRight: () => void | undefined;
  swipeTop: () => void | undefined;
}

interface SwiperIconType {
  name: string;
  type: string;
  onPress: () => void;
  color: string;
  size: number;
}

const SwiperButtons = ({
  swipeBack,
  swipeLeft,
  swipeRight,
  swipeTop,
}: Props) => {
  const icons: SwiperIconType[] = [
    {
      name: 'times',
      type: 'font-awesome',
      onPress: debounce(swipeLeft, 300),
      color: '#AF52DE',
      size: height / 38,
    },
    {
      name: 'backward',
      type: 'font-awesome',
      onPress: debounce(swipeBack, 300),
      color: '#52de69',
      size: height / 44,
    },

    {
      name: 'star',
      type: 'font-awesome',
      onPress: debounce(swipeTop, 300),
      color: '#007AE1',
      size: height / 32,
    },
    {
      name: 'bolt',
      type: 'font-awesome',
      onPress: debounce(swipeLeft, 300),
      color: '#dfd441',
      size: height / 44,
    },

    {
      name: 'heart',
      type: 'font-awesome',
      onPress: debounce(swipeRight, 300),
      color: '#FF375F',
      size: height / 38,
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <EvenlySpacedContainer>
        {icons.map((icon, index) => (
          <SwiperView key={index}>
            <SwiperIcon
              raised
              {...icon}
              /*            reverseColor="#fff"
              reverse={isDark} */
              Component={Ripple}
            />
          </SwiperView>
        ))}
      </EvenlySpacedContainer>
    </View>
  );
};

export default SwiperButtons;
