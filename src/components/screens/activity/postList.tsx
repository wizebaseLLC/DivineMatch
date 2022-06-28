/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated';
import { Post } from './post';
import {
  useListPostQuery,
  Post as PostGraphqlProps,
} from '../../../generated/generated';

interface Item {
  item: PostGraphqlProps;
}

interface FlexProps {
  peopleNearYouFlex: Animated.SharedValue<number>;
}

const viewabilityConfig = {
  waitForInteraction: true,
  itemVisiblePercentThreshold: 60,
};
const PostList = ({ peopleNearYouFlex }: FlexProps) => {
  const keyExtractor = (_: any, index: number) => index.toString();
  const [refreshing, setRefresh] = useState(false);

  const { data } = useListPostQuery();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [videoPlaying, setVideoPlaying] = useState<string>('');
  const onRefresh = useCallback(() => {
    setRefresh(true);
    setRefresh(false);
  }, []);
  const ref = useRef(null);

  useScrollToTop(ref);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    peopleNearYouFlex.value = interpolate(
      event.nativeEvent.contentOffset.y,
      [0, 200],
      [78, 0],
      Extrapolate.CLAMP,
    );
  };

  /*   const onViewableItemsChanged = useCallback(
    (obj: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      return setVideoPlaying(obj.viewableItems?.[0]?.item?.id);
    },
    [],
  );
 */
  useEffect(() => {
    if (isFirstLoad && data?.findManyPost?.[0]?.id) {
      setVideoPlaying(data.findManyPost[0].id);
      setIsFirstLoad(false);
    }
  }, [data, isFirstLoad]);

  const renderItem = useMemo(
    () => ({ item }: Item) => <Post {...item} {...{ videoPlaying }} />,
    [videoPlaying],
  );

  if (data?.findManyPost)
    return (
      <FlatList
        scrollEventThrottle={16}
        {...{
          /*     onViewableItemsChanged, */
          keyExtractor,
          data: data?.findManyPost,
          onScroll,
          ref,
          renderItem,
          refreshing,
          onRefresh,
          viewabilityConfig,
        }}
      />
    );
  return null;
};

export default PostList;
