/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';

import { useNavigation } from '@react-navigation/native';

import { ThemeContext } from 'styled-components';
import SwiperButtons from './buttons';
import { SwiperCard } from './Card';
import { HeaderDesignView, HeaderDesignViewWrapper } from './styledComponents';
import { ViewUserScreenNavigationProp } from '../../../screens/home';
import overlayLabels from './overlayLabels';
import Reshuffle from './reshuffle';
import {
  useCreateLikeMutation,
  useDeleteLikeByUserRecipientMutation,
  useListUserQuery,
  useMyProfileQuery,
  UserLimitedFields,
} from '../../../generated/generated';

const { height } = Dimensions.get('window');

export const Background = () => (
  <HeaderDesignViewWrapper style={{ ...StyleSheet.absoluteFillObject }}>
    <HeaderDesignView />
  </HeaderDesignViewWrapper>
);
export default () => {
  const swiper = useRef<Swiper<any>>();
  const navigation = useNavigation<ViewUserScreenNavigationProp>();
  const { data: list, refetch } = useListUserQuery({
    variables: { maxDistance: 150 },
  });
  const { data: me } = useMyProfileQuery();
  const theme = useContext(ThemeContext);
  const [isOutOfCards, setIsOutOfCards] = useState(false);
  const [
    swipeRightMutationData,
    setSwipeRightMutationData,
  ] = useState<UserLimitedFields | null>(null);
  const [
    swipeRightMutation,
    { data: swipeRightMutationAsyncData },
  ] = useCreateLikeMutation();
  const [deleteMutation] = useDeleteLikeByUserRecipientMutation();
  const onTapCard = useCallback(
    (index: number) => {
      const user = list?.listUsersDeckSwiper?.[index];
      if (user?.id) {
        const id = user?.id;
        if (id) navigation.navigate('ViewUser', { id });
      }
    },
    [list, navigation],
  );

  const onSwipedAll = () => {
    setIsOutOfCards(true);
  };

  const swipeBack = () => {
    return swiper.current?.swipeBack();
  };

  const swipeLeft = () => {
    return swiper?.current?.swipeLeft();
  };

  const swipeRight = () => {
    return swiper?.current?.swipeRight();
  };

  const swipeTop = () => {
    return swiper?.current?.swipeTop();
  };

  const onSwipedRight = useCallback(
    (index: number) => {
      if (list?.listUsersDeckSwiper?.[index]?.id && me?.myProfile?.id) {
        swipeRightMutation({
          variables: {
            input: {
              isDivine: false,
              recipientId: list?.listUsersDeckSwiper?.[index]?.id,
              userId: me?.myProfile?.id,
            },
          },
        });
      }
    },
    [list, me, swipeRightMutation],
  );

  const onSwipedTop = useCallback(
    (index: number) => {
      if (list?.listUsersDeckSwiper?.[index]?.id && me?.myProfile?.id) {
        swipeRightMutation({
          variables: {
            input: {
              isDivine: true,
              recipientId: list?.listUsersDeckSwiper?.[index]?.id,
              userId: me?.myProfile?.id,
            },
          },
        });
      }
    },
    [list, me, swipeRightMutation],
  );

  const handleRefetch = () => {
    setSwipeRightMutationData(null);
    refetch();
  };
  const onSwipedLeft = useCallback(
    (index: number) => {
      if (list?.listUsersDeckSwiper?.[index]?.id && me?.myProfile?.id) {
        deleteMutation({
          variables: {
            recipientId: list?.listUsersDeckSwiper?.[index]?.id,
            userId: me?.myProfile?.id,
          },
        });
      }
    },
    [list, me, deleteMutation],
  );

  useEffect(() => {
    if (
      swipeRightMutationAsyncData?.createLike?.isMatch &&
      list?.listUsersDeckSwiper?.[0]
    ) {
      const foundMatch = list?.listUsersDeckSwiper?.find(
        x => x?.id === swipeRightMutationAsyncData?.createLike?.recipientId,
      );

      if (foundMatch) setSwipeRightMutationData(foundMatch);
    }
  }, [list, swipeRightMutationAsyncData]);

  useEffect(() => {
    if (swipeRightMutationData && navigation.isFocused()) {
      navigation.push('NewDivineMatch', { user: swipeRightMutationData });
    }
  }, [swipeRightMutationData, navigation, list]);

  useEffect(() => {
    if (list?.listUsersDeckSwiper?.[0]) {
      setIsOutOfCards(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  const renderCard = (user: UserLimitedFields) => <SwiperCard {...{ user }} />;

  const props = useMemo(
    () => ({
      cards: list?.listUsersDeckSwiper || [],
      onSwipedAll,
      onSwipedRight,
      onTapCard,
      ref: swiper,
      renderCard,
      onSwipedTop,
      onSwipedLeft,
    }),
    [list, onTapCard, onSwipedRight, onSwipedTop, onSwipedLeft],
  );
  if (isOutOfCards)
    return <Reshuffle {...{ handleRefetch, setSwipeRightMutationData }} />;
  if (list?.listUsersDeckSwiper)
    return (
      <View style={{ flex: 1 }}>
        <Background />
        <View style={{ flex: 1, marginTop: height / 8 }}>
          <View style={{ flex: 7 }}>
            <Swiper
              key={list?.listUsersDeckSwiper?.[0]?.id}
              {...props}
              ref={(swipers: Swiper<UserLimitedFields>) => {
                // @ts-ignore
                swiper.current = swipers;
              }}
              disableBottomSwipe
              horizontalSwipe
              verticalSwipe
              cardVerticalMargin={theme.spacing * 2}
              cardHorizontalMargin={0}
              stackSize={3}
              stackSeparation={15}
              overlayLabels={overlayLabels}
              animateOverlayLabelsOpacity
              animateCardOpacity
              swipeBackCard
              backgroundColor="none"
              outputRotationRange={['5deg', '0deg', '-5deg']}
            />
          </View>
          <View style={{ flex: 1 }}>
            <SwiperButtons
              {...{ swipeBack, swipeRight, swipeLeft, swipeTop }}
            />
          </View>
        </View>
      </View>
    );
  return null;
};
