import { Video } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface InteractionBarProps {
  isVideo: boolean;
  videoRef: React.RefObject<Video>;
}

const { height } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  position: absolute;
  top: ${height / 2}px;
  padding: ${props => props.theme.spacing * 2}px;
  align-self: flex-end;
`;

export const StyledIcon = styled(Icon).attrs(() => ({
  type: 'font-awesome-5',
  size: 40,
  solid: true,
  color: '#fff',
}))`
  padding-bottom: ${props => props.theme.spacing * 2}px;
`;

const InteractionBar: React.FunctionComponent<InteractionBarProps> = props => {
  const { isVideo, videoRef } = props;
  const [isMuted, setIsMuted] = useState(false);
  const handleVolume = async () => {
    const status = await videoRef.current?.getStatusAsync();
    // @ts-ignore
    setIsMuted(!status.isMuted);
  };

  useEffect(() => {
    videoRef.current?.setIsMutedAsync(isMuted).then(() => {
      AsyncStorage.setItem('isMuted', isMuted ? 'true' : 'false');
    });
  }, [isMuted, videoRef]);

  useEffect(() => {
    AsyncStorage.getItem('isMuted').then(value => setIsMuted(value === 'true'));
  }, []);

  return (
    <Container>
      {isVideo &&
        (!isMuted ? (
          <StyledIcon name="volume-up" onPress={handleVolume} />
        ) : (
          <StyledIcon name="volume-mute" onPress={handleVolume} />
        ))}
      <StyledIcon name="comment-dots" />
      <StyledIcon name="heart" />
    </Container>
  );
};

export default InteractionBar;
