/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import { FlatList } from 'react-native';
import { ThemeContext } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { StyledBadge } from '../styledComponents';
import { ChatScreenNavigationProp } from '../../../../screens/chat';

interface ChatListProps {
  name: string;
  avatarUrl: string;
  subtitle: string;
}

interface Item {
  item: ChatListProps;
}

const list = [
  {
    name: 'Amy Farha',
    avatarUrl:
      'https://www.rollingstone.com/wp-content/uploads/2017/10/cardi-b-rolling-stone-interview-cover_.jpg?resize=1800,1200&w=1800',
    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson',
    avatarUrl:
      'https://sportsnaut.com/wp-content/uploads/2020/08/dwayne-johnson-the-rock-buy-xfl-15-million-696x547.jpg',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Marisa Bop',
    avatarUrl:
      'https://yt3.ggpht.com/a/AATXAJx5R7wPL-FXcTZvQ5wjgMNoj3F3wihflT_dKQVUdQ=s900-c-k-c0xffffffff-no-rj-mo',
    subtitle: 'Vice President',
  },
  {
    name: 'Smarriage',
    avatarUrl:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/mcx050120fe-coverstory-006-web-1585844852.jpg',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Ambahhhh',
    avatarUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRBjhUuoEV12X1j24rnhNp78jsCe1GuMFIAiA&usqp=CAU',
    subtitle: 'Vice President',
  },
  {
    name: 'Gorgs',
    avatarUrl:
      'https://img1.looper.com/img/gallery/who-the-rocks-social-media-diss-was-really-targeted-at/intro-1568654220.jpg',

    subtitle: 'Vice Chairman',
  },
  {
    name: 'BumBum',
    avatarUrl:
      'https://media1.popsugar-assets.com/files/thumbor/AGrnZ7byviteF-apdEp9Pl0VAKs/546x127:1732x1313/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/12/12/838/n/44344577/649eb46e5df290072ddd14.00644164_/i/Cardi-B.jpg',
    subtitle: 'Vice President',
  },
  {
    name: 'MyLurv',
    avatarUrl:
      'https://www.cheatsheet.com/wp-content/uploads/2020/06/Cardi-B-1.jpg',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Amy Farha',
    avatarUrl:
      'https://www.rollingstone.com/wp-content/uploads/2017/10/cardi-b-rolling-stone-interview-cover_.jpg?resize=1800,1200&w=1800',
    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson',
    avatarUrl:
      'https://sportsnaut.com/wp-content/uploads/2020/08/dwayne-johnson-the-rock-buy-xfl-15-million-696x547.jpg',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Marisa Bop',
    avatarUrl:
      'https://yt3.ggpht.com/a/AATXAJx5R7wPL-FXcTZvQ5wjgMNoj3F3wihflT_dKQVUdQ=s900-c-k-c0xffffffff-no-rj-mo',
    subtitle: 'Vice President',
  },
  {
    name: 'Smarriage',
    avatarUrl:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/mcx050120fe-coverstory-006-web-1585844852.jpg',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Ambahhhh',
    avatarUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRBjhUuoEV12X1j24rnhNp78jsCe1GuMFIAiA&usqp=CAU',
    subtitle: 'Vice President',
  },
  {
    name: 'Gorgs',
    avatarUrl:
      'https://img1.looper.com/img/gallery/who-the-rocks-social-media-diss-was-really-targeted-at/intro-1568654220.jpg',

    subtitle: 'Vice Chairman',
  },
  {
    name: 'BumBum',
    avatarUrl:
      'https://media1.popsugar-assets.com/files/thumbor/AGrnZ7byviteF-apdEp9Pl0VAKs/546x127:1732x1313/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/12/12/838/n/44344577/649eb46e5df290072ddd14.00644164_/i/Cardi-B.jpg',
    subtitle: 'Vice President',
  },
  {
    name: 'MyLurv',
    avatarUrl:
      'https://www.cheatsheet.com/wp-content/uploads/2020/06/Cardi-B-1.jpg',
    subtitle: 'Vice Chairman',
  },
];
const Chat: React.FunctionComponent<ChatListProps> = ({
  name,
  avatarUrl,
  subtitle,
}) => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation<ChatScreenNavigationProp>();

  const onPress = () => {
    navigation.navigate('Chat', { avatar: avatarUrl, id: name });
  };

  return (
    // @ts-ignore
    <ListItem
      {...{
        onPress,
        containerStyle: {
          backgroundColor: theme.colors.paper,
        },
      }}
    >
      <Avatar source={{ uri: avatarUrl }} rounded size="medium" />
      <ListItem.Content>
        <ListItem.Title style={{ fontFamily: theme.font.subHeading }}>
          {name}
        </ListItem.Title>
        <ListItem.Subtitle style={{ fontFamily: theme.font.light }}>
          {subtitle}
        </ListItem.Subtitle>
      </ListItem.Content>
      <StyledBadge />
      <ListItem.Chevron />
    </ListItem>
  );
};

const ChatList = () => {
  const [refresh, setRefresh] = useState(false);

  const onRefresh = () => {
    setRefresh(true);
    setRefresh(false);
  };

  const keyExtractor = (_: any, index: number) => index.toString();

  const renderItem = ({ item }: Item) => <Chat {...item} />;

  return (
    <FlatList
      refreshing={refresh}
      onRefresh={onRefresh}
      keyExtractor={keyExtractor}
      data={list}
      renderItem={renderItem}
    />
  );
};

export default ChatList;
