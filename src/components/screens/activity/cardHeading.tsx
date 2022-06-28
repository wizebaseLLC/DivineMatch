import React, { memo, useCallback, useContext, useMemo } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useNavigation } from '@react-navigation/native';
import styled, { ThemeContext } from 'styled-components/native';
import { Text, Icon } from 'react-native-elements';
import { Maybe } from 'graphql/jsutils/Maybe';
import { CardHeading, HeadingText, LightText } from './styledComponents';
import { PostModalNavigationProp } from '../../../screens/activity';

dayjs.extend(relativeTime);

// import Ripple from "react-native-material-ripple";

interface Props {
  user: {
    name: string;
    avatar: string;
    id: string;
  };
  postedOn: Date;
  location: string;
  flair: Maybe<string> | undefined;
  flairText: Maybe<string> | undefined;
}

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SmallText = styled(Text)`
  font-family: ${props => props.theme.font.light};
  font-size: 9px;
`;

const CardHead = memo(
  ({ postedOn, user, location, flair, flairText }: Props) => {
    const nav = useNavigation<PostModalNavigationProp>();
    const theme = useContext(ThemeContext);
    const onPressTag = useCallback(() => {
      nav.navigate('ViewUser', { id: user.id });
    }, [nav, user]);

    const postDateFromNow = useMemo(() => dayjs(postedOn).fromNow(), [
      postedOn,
    ]);
    return (
      <CardHeading>
        <TouchableOpacity onPress={onPressTag}>
          <Image
            source={{ uri: user.avatar }}
            style={{
              height: 50,
              width: 50,
              borderRadius: 40,
              margin: theme.spacing / 2,
            }}
          />
        </TouchableOpacity>
        <View style={{ justifyContent: 'center' }}>
          <Row>
            <HeadingText>{user.name}</HeadingText>
            {flair && flairText && (
              <SmallText>{`  is feeling ${flairText.toLowerCase()} ${flair}`}</SmallText>
            )}
          </Row>
          <Row>
            <LightText>Posted {postDateFromNow}</LightText>
            <Icon
              name="room"
              type="material"
              size={8}
              color={theme.colors.success}
              style={{ marginLeft: theme.spacing / 2 }}
            />
            <SmallText>{location}</SmallText>
          </Row>
        </View>
      </CardHeading>
    );
  },
);

export default CardHead;
