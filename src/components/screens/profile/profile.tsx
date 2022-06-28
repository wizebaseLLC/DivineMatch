import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { ThemeContext } from 'styled-components';
import ImageView from 'react-native-image-viewing';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
  StyledCardNonSwiper,
  ProfileSectionHeaderText,
} from './components/styledComponents';
import BannerInfo from './bannerInfo';
import Biography from './components/biography';
import SendMessageButton from './components/sendMessage';
import BlockUser from './components/blockUserButton';
import Interests from './components/interests';
import Spiritualties from './components/spiritualities';
import { ViewUserScreenRouteProp } from '../../../screens/home';
import ProfileImage from './components/profileImage';
import ImageScroller from './components/imageScroller';
import { ProfileScreenNavigationProp } from '../../../screens/profile';
import {
  useGetUserQuery,
  useMyProfileQuery,
  User,
  useUserChangeSubscription,
} from '../../../generated/generated';
import FindMe from './components/FindMe';
import ButtonGroupFeed from './components/buttonGroup';

interface ProfileProps {
  isNotMyProfile?: boolean;
}

interface Coordinates {
  x: number;
  y: number;
}

interface ScrollToProps {
  scrollTo: (props: Coordinates) => void;
}

const Profile = ({ isNotMyProfile }: ProfileProps) => {
  const [visible, setIsVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [userData, setUserData] = useState<User | undefined>();
  const [imageViewerIndex, setImageViewerIndex] = useState(0);
  const [buttonGroupIndex, setButtonGroupIndex] = useState(0);
  const route = useRoute<ViewUserScreenRouteProp>();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSetButtonIndex = (index: number) => {
    setButtonGroupIndex(index);
  };

  const { data: me } = useMyProfileQuery();

  const { data: userChanged } = useUserChangeSubscription({
    variables: {
      id: (route?.params?.id as string) || (userData?.id as string),
    },
  });
  const { data: viewUser, refetch } = useGetUserQuery({
    variables: {
      id: (route?.params?.id as string) || (userData?.id as string),
    },
  });

  useEffect(() => {
    refetch();
  }, [userChanged, refetch]);

  useEffect(() => {
    if (isNotMyProfile) {
      setUserData(viewUser?.getUser as User | undefined);
    } else {
      setUserData(me?.myProfile as User | undefined);
    }
  }, [me, viewUser, isNotMyProfile]);

  const theme = useContext(ThemeContext);

  const setImageVisible = (index: number) => () => {
    setImageViewerIndex(index);
    setIsVisible(true);
  };

  const setImageNotVisible = () => {
    setImageViewerIndex(0);
    setIsVisible(false);
  };

  const images = useMemo(
    () =>
      [
        userData?.gallery1,
        userData?.gallery2,
        userData?.gallery3,
        userData?.gallery4,
      ]
        ?.filter(x => x)
        ?.map((uri, id) => ({ uri: uri as string, id })),
    [userData],
  );

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const dotIndex = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    if (event.contentOffset.y >= scale.value) {
      scale.value = withSpring(event.contentOffset.y);
      opacity.value = 1;
    } else {
      scale.value = event.contentOffset.y;
    }
  });

  const scrollViewRef = useRef<ScrollToProps>(null);

  const scrollToTop = (time: number) => {
    setIsButtonDisabled(true);
    scrollViewRef?.current?.scrollTo({ x: 0, y: 0 });
    setTimeout(() => {
      handleGoBack();
    }, time);
  };
  if (userData?.email)
    return (
      <StyledCardNonSwiper>
        {images?.[0] && (
          <ImageView
            images={images}
            imageIndex={imageViewerIndex}
            visible={visible}
            onRequestClose={setImageNotVisible}
          />
        )}
        <Animated.ScrollView
          // @ts-ignore
          ref={scrollViewRef}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <ProfileImage
            {...{
              uri: userData?.profilepic,
              scale,
              id: route?.params?.id as string,
              firstname: userData?.firstname,
              lastname: userData?.lastname,
              location: userData?.location,
              isNotMyProfile: !!isNotMyProfile,
            }}
          />

          <View
            style={{
              backgroundColor: theme.colors.paper,
            }}
          >
            <BannerInfo {...{ userData }} />
            <FindMe
              {...{
                location: userData.location,
                updatedAt: userData.updatedAt,
              }}
            />
            <View
              style={{
                marginTop: theme.spacing,
              }}
            >
              <ButtonGroupFeed
                index={buttonGroupIndex}
                handleSetButtonIndex={handleSetButtonIndex}
              />
              <Biography {...{ about: userData.about }} />

              {images?.[0] && (
                <>
                  <View
                    style={{
                      alignItems: 'center',
                      marginTop: theme.spacing * 4,
                    }}
                  >
                    <ProfileSectionHeaderText>
                      My Gallery
                    </ProfileSectionHeaderText>
                  </View>
                  <ImageScroller {...{ dotIndex, images, setImageVisible }} />
                </>
              )}
              <Interests {...{ interests: userData.interest }} />
              <Spiritualties {...{ spiritualties: userData.spirituality }} />

              {isNotMyProfile && (
                <>
                  <SendMessageButton
                    {...{ handleGoBack: scrollToTop, isButtonDisabled }}
                  />
                  <BlockUser />
                </>
              )}
            </View>
          </View>
        </Animated.ScrollView>
      </StyledCardNonSwiper>
    );
  return null;
};
export default Profile;
