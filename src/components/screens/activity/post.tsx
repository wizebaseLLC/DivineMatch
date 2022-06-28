/* eslint-disable no-nested-ternary */
import React, { memo, useContext, useMemo } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';
import { ThemeContext } from 'styled-components';
import styled from 'styled-components/native';
import { Video } from 'expo-av';
import { FatText, NormalText, WriterText } from './styledComponents';
import InteractWithPost from './interactWIthPost';
import LikeCommentCount from './likeCommentCount';
import { ScrollImagesCard } from './scrollImagesCard';
import CardHead from './cardHeading';
import Ellipses from './ellipses';
import {
  Post as PostGraphqlProps,
  PostMedia,
} from '../../../generated/generated';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export interface Props extends PostGraphqlProps {
  videoPlaying: string;
}

const Row = styled.View`
  flex-direction: row;
  padding: ${props => props.theme.spacing / 2}px;
`;

export const Post = memo(
  ({
    createdAt,
    firstname,
    lastname,
    profilepic,
    location,
    body,
    flair,
    flairText,
    media,
    userId,
    videoPlaying,
    id,
  }: Props) => {
    const theme = useContext(ThemeContext);
    const videoRef = React.useRef<Video>(null);
    const name = useMemo(() => `${firstname} ${lastname}`, [
      firstname,
      lastname,
    ]);

    return (
      <Card
        containerStyle={{
          width: windowWidth,
          margin: 0,
          backgroundColor: theme.colors.paper,
          padding: 0,
          marginTop: theme.spacing,
          borderWidth: 0,
        }}
      >
        <CardHead
          user={{
            name,
            avatar: profilepic,
            id: userId,
          }}
          location={location}
          postedOn={createdAt}
          flairText={flairText}
          flair={flair}
        />
        <Ellipses />
        <View style={{ flex: 1 }}>
          {media?.uri && (
            <View style={{ zIndex: 20, elevation: 20, opacity: 1 }}>
              <>
                <ScrollImagesCard
                  {...{
                    id,
                    body,
                    userId,
                    media: media as PostMedia,
                    videoPlaying,
                    videoRef,
                  }}
                />
              </>
            </View>
          )}
          {body && body.trim().length > 0 ? (
            <ScrollView
              style={
                media?.uri
                  ? { margin: theme.spacing, maxHeight: windowHeight / 2 }
                  : { marginLeft: theme.spacing, maxHeight: windowHeight / 2 }
              }
            >
              {!media?.uri && body && body.length < 40 ? (
                <FatText>{body.replace(/[\r\n]+/g, '\n')}</FatText>
              ) : (
                <Row>
                  <NormalText>
                    <WriterText>{`${name}:  `}</WriterText>
                    {body?.replace(/[\r\n]+/g, '\n\n')}
                  </NormalText>
                </Row>
              )}
            </ScrollView>
          ) : null}
          <LikeCommentCount />
          <InteractWithPost />
        </View>
      </Card>
    );
  },
);
