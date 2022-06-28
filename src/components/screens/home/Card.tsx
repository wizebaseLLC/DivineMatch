import React, { memo, useContext, useMemo } from 'react';
import { Icon } from 'react-native-elements';
import { Dimensions, Image, View } from 'react-native';
import { ThemeContext } from 'styled-components';
import { SharedElement } from 'react-navigation-shared-element';
import dayjs from 'dayjs';

import {
  OnlineCircle,
  AddressText,
  CardInfoBanner,
  NameText,
} from './styledComponents';
import { WhiteOverlay } from '../../../library/ui';
import {
  useGetUserQuery,
  UserLimitedFields,
} from '../../../generated/generated';

const { height, width } = Dimensions.get('window');

export interface ProfileProps {
  user?: UserLimitedFields;
  noBorder?: boolean;
}
export const SwiperCard = memo(({ user, noBorder }: ProfileProps) => {
  const theme = useContext(ThemeContext);

  useGetUserQuery({
    variables: {
      id: user?.id as string,
    },
  });

  const updatedRecently = useMemo(() => {
    if (user?.updatedAt) {
      const oneHour = dayjs().subtract(1, 'hour');
      const compare = oneHour.isBefore(dayjs(user.updatedAt));

      return compare;
    }
    return false;
  }, [user]);

  return (
    <View>
      <SharedElement
        id={user?.id as string}
        style={{
          borderRadius: 20,
          width: width * 0.98,
          alignSelf: 'center',
          height: noBorder ? height / 2 : height / 1.8,
        }}
      >
        <Image
          source={{ uri: user?.profilepic as string }}
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            flex: 1,
            width: width * 0.98,
            backgroundColor: theme.colors.paper,
          }}
        />
      </SharedElement>
      <CardInfoBanner
        style={{
          height: height / 11,
          width: width * 0.98,
          alignSelf: 'center',
          borderBottomWidth: noBorder ? 0 : 2,
          borderTopRightRadius: noBorder ? 20 : 0,
          borderTopLeftRadius: noBorder ? 20 : 0,
          marginTop: noBorder ? -theme.spacing * 2 : 0,
        }}
      >
        {!noBorder && <WhiteOverlay borderRadius={20} isOnlyBottomRadius />}
        <View style={{ marginLeft: theme.spacing }}>
          <View style={{ flexDirection: 'row' }}>
            <NameText>{user?.firstname}</NameText>
            {updatedRecently && <OnlineCircle />}
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Icon name="room" type="material" size={15} />
            <AddressText>
              {Math.round(user?.distance as number)} Miles away
            </AddressText>
          </View>
        </View>
      </CardInfoBanner>
    </View>
  );
});

/* 
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
console.log(oneHour.fromNow()); 
*/
