/* eslint-disable no-unused-expressions */
import React, { memo, useEffect, useMemo, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Video } from 'expo-av';
import { Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { log } from 'react-native-reanimated';
import { MEDIA_HEIGHT } from './constants';

const preTriggerRatio = 0.1;
interface Props {
  id: string;
  uri: string;
  videoRef: React.RefObject<Video>;
  videoPlaying?: string | null;
  isFullScreen?: boolean;
}

const VideoForCard = memo(
  ({ id, videoPlaying, uri, isFullScreen, videoRef }: Props) => {
    const [shouldPlay, setShouldPlay] = useState(false);
    const isFocused = useIsFocused();
    const [isMuted, setIsMuted] = useState(false);
    const viewPortIsFocused = useMemo(() => id === videoPlaying, [
      id,
      videoPlaying,
    ]);

    /*     const arraysViewPortIsFocused = useMemo(
      () => arr?.[dotIndex]?.uri === uri,
      [arr, dotIndex, uri],
    );

    useEffect(() => {
      if (viewPortIsFocused && arraysViewPortIsFocused) setShouldPlay(true);
      if (!arraysViewPortIsFocused || !viewPortIsFocused) setShouldPlay(false);
    }, [id, arr, dotIndex, uri, viewPortIsFocused, arraysViewPortIsFocused]); */
    /* 
    useEffect(() => {
      if (!isFocused) setShouldPlay(false);
      if (isFocused && viewPortIsFocused && arraysViewPortIsFocused)
        setShouldPlay(true);
    }, [
      isFocused,
      id,
      videoPlaying,
      arraysViewPortIsFocused,
      viewPortIsFocused,
    ]);
 */

    const handlePress = async () => {
      const status = await videoRef.current?.getStatusAsync();
      // @ts-ignore
      if (status?.isPlaying) {
        videoRef.current?.pauseAsync();
      } else {
        videoRef.current?.playAsync();
      }
    };

    useEffect(() => {
      AsyncStorage.getItem('isMuted').then(value =>
        setIsMuted(value === 'true'),
      );
    });

    return (
      <Pressable
        onPress={handlePress}
        disabled={!isFullScreen}
        style={{ flex: 1 }}
      >
        <Video
          ref={videoRef}
          source={{
            uri,
          }}
          rate={1.0}
          isMuted={isMuted}
          volume={1.0}
          style={{
            borderRadius: 0,
            height: isFullScreen ? undefined : MEDIA_HEIGHT,
            flex: isFullScreen ? 1 : undefined,
          }}
          resizeMode={Video.RESIZE_MODE_COVER}
          isLooping
          {...{ preTriggerRatio, shouldPlay }}
        />
      </Pressable>
    );
  },
);

export default VideoForCard;
