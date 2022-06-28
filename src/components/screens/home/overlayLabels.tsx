import React from 'react';
import { Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { height } = Dimensions.get('window');
const iconHeight = height / 6;

const overlayLabels = {
  top: {
    element: (
      <LottieView
        source={require('../../../../assets/lottie/drool.json')}
        autoPlay
        loop
        style={{ height: iconHeight }}
      />
    ),
    style: {
      wrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -8,
      },
    },
  },

  left: {
    element: (
      <LottieView
        source={require('../../../../assets/lottie/nope.json')}
        autoPlay
        loop
        speed={0.5}
        style={{ height: iconHeight }}
      />
    ),
    style: {
      wrapper: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        marginTop: 30,
      },
    },
  },
  right: {
    element: (
      <LottieView
        source={require('../../../../assets/lottie/kissing.json')}
        autoPlay
        loop
        style={{ height: iconHeight }}
      />
      /*    <Icon name="heart" type="font-awesome" color="red" size={iconHeight} /> */
    ),
    style: {
      label: {
        backgroundColor: 'black',
        borderColor: 'black',
        color: 'white',
        borderWidth: 1,
      },
      wrapper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 30,
      },
    },
  },
};

export default overlayLabels;
