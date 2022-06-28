/* eslint-disable no-param-reassign */
import React, { memo } from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Video } from 'expo-av';
import { PostMedia } from '../../../generated/generated';
import VideoForCard from './video';
import { MEDIA_HEIGHT } from './constants';
import { ViewActivityImageScreenNavigationProp } from '../../../screens/activity';

const { width, height } = Dimensions.get('window');

export type DotImagesType = Array<{ uri: string }>;
interface Props {
  id: string;
  userId: string;
  videoRef: React.RefObject<Video>;
  body: Maybe<string> | undefined;
  videoPlaying: string;
  media: PostMedia;
  isFullScreen?: boolean;
}

export const ScrollImagesCard = memo(
  ({
    id,
    media,
    videoPlaying,
    userId,
    body,
    isFullScreen,
    videoRef,
  }: Props) => {
    const navigation = useNavigation<ViewActivityImageScreenNavigationProp>();

    const onViewImage = () => {
      if (media?.uri)
        navigation.navigate('ImageView', {
          id,
          body,
          userId,
          media,
          videoPlaying,
        });
    };

    console.log({
      id,
      media,
      videoPlaying,
      userId,
      body,
      isFullScreen,
    });
    return (
      <View style={{ width, flex: 1 }}>
        <TouchableOpacity
          style={{ width, flex: 1 }}
          onPress={onViewImage}
          disabled={isFullScreen}
        >
          {media?.mediaType === 'image' ? (
            <Image
              source={{ uri: media?.uri }}
              style={{
                width,
                height: isFullScreen ? height : MEDIA_HEIGHT,
              }}
              resizeMode={isFullScreen ? 'contain' : undefined}
            />
          ) : (
            <VideoForCard
              {...{
                videoPlaying,
                id,
                uri: media?.uri,
                isFullScreen,
                videoRef,
              }}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  },
);
