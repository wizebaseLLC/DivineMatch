import { useRoute } from '@react-navigation/native';
import React from 'react';
import { PostModalScreenRouteProp } from '../../../../screens/activity';
import ImageVideo from './imageVideo';
import BottomSheetText from './text';

const BottomSheetSwitch = () => {
  const route = useRoute<PostModalScreenRouteProp>();
  const { id } = route.params;
  switch (id) {
    case 'text':
      return <BottomSheetText />;

    case 'image':
      return <ImageVideo />;
    default:
      return null;
  }
};

export default BottomSheetSwitch;
