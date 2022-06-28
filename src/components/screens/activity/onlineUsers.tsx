/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable spaced-comment */
import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
//@ts-ignore
import { Avatar, Accessory } from 'react-native-elements';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';
import { mix } from 'react-native-redash';
import { ThemeContext } from 'styled-components';

const dummyList = [
  {
    postedOn: '5 hours ago',
    user: {
      avatar:
        'https://sportsnaut.com/wp-content/uploads/2020/08/dwayne-johnson-the-rock-buy-xfl-15-million-696x547.jpg',
      name: 'The Rock',
    },
  },
  {
    images: null,
    postedOn: '5 hours ago',
    user: {
      avatar:
        'https://sportsnaut.com/wp-content/uploads/2020/08/dwayne-johnson-the-rock-buy-xfl-15-million-696x547.jpg',
      name: 'The Rock',
    },
    text: 'Bloooooooood',
  },
  {
    postedOn: '5 hours ago',
    user: {
      avatar: 'https://www.nme.com/wp-content/uploads/2020/08/Cardi_Megan.jpg',
      name: 'Marisa Boo',
    },
    text: 'Diggidy Dog',
  },
  {
    postedOn: '5 hours ago',
    user: {
      avatar:
        'https://yt3.ggpht.com/a/AATXAJx5R7wPL-FXcTZvQ5wjgMNoj3F3wihflT_dKQVUdQ=s900-c-k-c0xffffffff-no-rj-mo',
      name: 'Da Baby',
    },
    text: 'Vuruvuru',
  },
  {
    postedOn: '5 hours ago',
    user: {
      avatar:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/mcx050120fe-coverstory-006-web-1585844852.jpg',
      name: 'Chulo',
    },
    text: 'Mommy ass fine',
  },
  {
    postedOn: '5 hours ago',
    user: {
      avatar:
        'https://www.rollingstone.com/wp-content/uploads/2017/10/cardi-b-rolling-stone-interview-cover_.jpg?resize=1800,1200&w=1800',
      name: 'The Rock',
    },
    text: 'yaaaaa mane',
  },
  {
    postedOn: '5 hours ago',
    user: {
      avatar:
        'https://sportsnaut.com/wp-content/uploads/2020/08/dwayne-johnson-the-rock-buy-xfl-15-million-696x547.jpg',
      name: 'The Rock',
    },
    text: 'Bloooooooood',
  },
];

interface Props {
  peopleNearYouFlex: Animated.SharedValue<number>;
}

const AnimatedAvatar = Animated.createAnimatedComponent(Avatar);
const OnlineUsers = ({ peopleNearYouFlex }: Props) => {
  const theme = useContext(ThemeContext);

  const stylez = useAnimatedStyle(() => {
    return {
      height: peopleNearYouFlex.value,
    };
  });

  const borderColor = useSharedValue(0);
  const scale = useSharedValue(0);

  const derivedBorderColor = useDerivedValue(
    () =>
      /*  mixColor(borderColor.value, theme.colors.primary, theme.colors.secondaryAlt) */
      theme.colors.primary,
  );

  const derivedScale = useDerivedValue(() => mix(scale.value, 1, 1.02));

  const borderColorProps = useAnimatedProps(() => ({
    borderColor: derivedBorderColor.value,
    borderWidth: 3,
    marginLeft: theme.spacing,
    marginTop: theme.spacing,
    size: 60,
    transform: [{ scale: derivedScale.value }],
  }));

  useEffect(() => {
    borderColor.value = withRepeat(
      withTiming(5, { duration: 20000 }),
      -1,
      true,
    );
    scale.value = withRepeat(withTiming(1, { duration: 2000 }), -1, true);
  }, []);

  return (
    <Animated.View style={[stylez]}>
      <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <AnimatedAvatar
          {...{
            rounded: true,
            source: {
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            },
            animatedProps: borderColorProps,
          }}
        >
          <Accessory
            {...{
              name: 'plus',
              color: theme.colors.actionBlue,
              reverse: true,
              type: 'font-awesome-5',
              iconStyle: { color: '#fff' },
              size: 12,
            }}
          />
        </AnimatedAvatar>
        {dummyList.map((user, index) => (
          <View key={index}>
            <Avatar
              size={60}
              rounded
              containerStyle={{
                marginLeft: theme.spacing,
                marginTop: theme.spacing,
                borderColor: 'lightgreen',
                borderWidth: index % 3 === 0 ? 2 : 0,
              }}
              source={{
                uri: user.user.avatar,
              }}
            />
          </View>
        ))}
      </Animated.ScrollView>
    </Animated.View>
  );
};
export default OnlineUsers;
