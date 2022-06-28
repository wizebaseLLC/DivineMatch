import { useRoute } from '@react-navigation/native';
import { Video } from 'expo-av';
import React from 'react';
import styled from 'styled-components/native';
import { ViewActivityImageScreenRouteProp } from '../../../../screens/activity';
import { ScrollImagesCard } from '../scrollImagesCard';
import InteractionBar from './interactionBar';

export const Container = styled.View`
  flex: 1;
`;

function ImageView() {
  const route = useRoute<ViewActivityImageScreenRouteProp>();
  const videoRef = React.useRef<Video>(null);
  return (
    <Container>
      <ScrollImagesCard {...route.params} isFullScreen videoRef={videoRef} />
      <InteractionBar
        isVideo={route.params?.media?.mediaType === 'video'}
        videoRef={videoRef}
      />
    </Container>
  );
}

export default ImageView;
