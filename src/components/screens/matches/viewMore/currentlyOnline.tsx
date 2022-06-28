/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Text, Avatar, Badge } from 'react-native-elements';
import { ThemeContext } from 'styled-components';

interface Props {
  user: {
    avatar: string;
    name: string;
    location: string;
  };
}

interface Item {
  item: Props;
}

const dummyList = [
  {
    user: {
      location: 'Brooklyn, NY',
      avatar:
        'https://sportsnaut.com/wp-content/uploads/2020/08/dwayne-johnson-the-rock-buy-xfl-15-million-696x547.jpg',
      name: 'The Rock',
    },
    text: 'Bloooooooood',
  },
  {
    user: {
      location: 'Brooklyn, NY',
      avatar: 'https://www.nme.com/wp-content/uploads/2020/08/Cardi_Megan.jpg',
      name: 'Marisa Boo',
    },
    text: 'Diggidy Dog',
  },
  {
    user: {
      location: 'Brooklyn, NY',
      avatar:
        'https://yt3.ggpht.com/a/AATXAJx5R7wPL-FXcTZvQ5wjgMNoj3F3wihflT_dKQVUdQ=s900-c-k-c0xffffffff-no-rj-mo',
      name: 'Da Baby',
    },
    text: 'Vuruvuru',
  },
  {
    user: {
      location: 'Brooklyn, NY',
      avatar:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/mcx050120fe-coverstory-006-web-1585844852.jpg',
      name: 'Chulo',
    },
    text: 'Mommy ass fine',
  },
  {
    user: {
      location: 'Brooklyn, NY',
      avatar:
        'https://www.rollingstone.com/wp-content/uploads/2017/10/cardi-b-rolling-stone-interview-cover_.jpg?resize=1800,1200&w=1800',
      name: 'The Rock',
    },
    text: 'yaaaaa mane',
  },
  {
    user: {
      location: 'Brooklyn, NY',
      avatar:
        'https://sportsnaut.com/wp-content/uploads/2020/08/dwayne-johnson-the-rock-buy-xfl-15-million-696x547.jpg',
      name: 'The Rock',
    },
    text: 'Bloooooooood',
  },
  {
    user: {
      location: 'Brooklyn, NY',
      avatar:
        'https://sportsnaut.com/wp-content/uploads/2020/08/dwayne-johnson-the-rock-buy-xfl-15-million-696x547.jpg',
      name: 'The Rock',
    },
  },
  {
    user: {
      location: 'Brooklyn, NY',
      avatar:
        'https://sportsnaut.com/wp-content/uploads/2020/08/dwayne-johnson-the-rock-buy-xfl-15-million-696x547.jpg',
      name: 'The Rock',
    },
    text: 'Bloooooooood',
  },
  {
    user: {
      location: 'Brooklyn, NY',
      avatar: 'https://www.nme.com/wp-content/uploads/2020/08/Cardi_Megan.jpg',
      name: 'Marisa Boo',
    },
    text: 'Diggidy Dog',
  },
  {
    user: {
      location: 'Brooklyn, NY',
      avatar:
        'https://yt3.ggpht.com/a/AATXAJx5R7wPL-FXcTZvQ5wjgMNoj3F3wihflT_dKQVUdQ=s900-c-k-c0xffffffff-no-rj-mo',
      name: 'Da Baby',
    },
    text: 'Vuruvuru',
  },
  {
    user: {
      location: 'Brooklyn, NY',
      avatar:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/mcx050120fe-coverstory-006-web-1585844852.jpg',
      name: 'Chulo',
    },
    text: 'Mommy ass fine',
  },
  {
    user: {
      location: 'Brooklyn, NY',
      avatar:
        'https://www.rollingstone.com/wp-content/uploads/2017/10/cardi-b-rolling-stone-interview-cover_.jpg?resize=1800,1200&w=1800',
      name: 'The Rock',
    },
    text: 'yaaaaa mane',
  },
  {
    user: {
      location: 'Brooklyn, NY',
      avatar:
        'https://sportsnaut.com/wp-content/uploads/2020/08/dwayne-johnson-the-rock-buy-xfl-15-million-696x547.jpg',
      name: 'The Rock',
    },
    text: 'Bloooooooood',
  },
  {
    user: {
      location: 'Brooklyn, NY',
      avatar:
        'https://sportsnaut.com/wp-content/uploads/2020/08/dwayne-johnson-the-rock-buy-xfl-15-million-696x547.jpg',
      name: 'The Rock',
    },
  },
  {
    user: {
      location: 'Brooklyn, NY',
      avatar:
        'https://sportsnaut.com/wp-content/uploads/2020/08/dwayne-johnson-the-rock-buy-xfl-15-million-696x547.jpg',
      name: 'The Rock',
    },
    text: 'Bloooooooood',
  },
  {
    user: {
      location: 'Brooklyn, NY',
      avatar: 'https://www.nme.com/wp-content/uploads/2020/08/Cardi_Megan.jpg',
      name: 'Marisa Boo',
    },
    text: 'Diggidy Dog',
  },
  {
    user: {
      location: 'Brooklyn, NY',
      avatar:
        'https://yt3.ggpht.com/a/AATXAJx5R7wPL-FXcTZvQ5wjgMNoj3F3wihflT_dKQVUdQ=s900-c-k-c0xffffffff-no-rj-mo',
      name: 'Da Baby',
    },
    text: 'Vuruvuru',
  },
  {
    user: {
      location: 'Brooklyn, NY',
      avatar:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/mcx050120fe-coverstory-006-web-1585844852.jpg',
      name: 'Chulo',
    },
    text: 'Mommy ass fine',
  },
  {
    user: {
      location: 'Brooklyn, NY',
      avatar:
        'https://www.rollingstone.com/wp-content/uploads/2017/10/cardi-b-rolling-stone-interview-cover_.jpg?resize=1800,1200&w=1800',
      name: 'The Rock',
    },
    text: 'yaaaaa mane',
  },
  {
    user: {
      location: 'Brooklyn, NY',
      avatar:
        'https://sportsnaut.com/wp-content/uploads/2020/08/dwayne-johnson-the-rock-buy-xfl-15-million-696x547.jpg',
      name: 'The Rock',
    },
    text: 'Bloooooooood',
  },
  {
    user: {
      location: 'Brooklyn, NY',
      avatar:
        'https://sportsnaut.com/wp-content/uploads/2020/08/dwayne-johnson-the-rock-buy-xfl-15-million-696x547.jpg',
      name: 'The Rock',
    },
  },
  {
    user: {
      location: 'Brooklyn, NY',
      avatar:
        'https://sportsnaut.com/wp-content/uploads/2020/08/dwayne-johnson-the-rock-buy-xfl-15-million-696x547.jpg',
      name: 'The Rock',
    },
    text: 'Bloooooooood',
  },
  {
    user: {
      location: 'Brooklyn, NY',
      avatar: 'https://www.nme.com/wp-content/uploads/2020/08/Cardi_Megan.jpg',
      name: 'Marisa Boo',
    },
    text: 'Diggidy Dog',
  },
  {
    user: {
      location: 'Brooklyn, NY',
      avatar:
        'https://yt3.ggpht.com/a/AATXAJx5R7wPL-FXcTZvQ5wjgMNoj3F3wihflT_dKQVUdQ=s900-c-k-c0xffffffff-no-rj-mo',
      name: 'Da Baby',
    },
    text: 'Vuruvuru',
  },
  {
    user: {
      location: 'Brooklyn, NY',
      avatar:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/mcx050120fe-coverstory-006-web-1585844852.jpg',
      name: 'Chulo',
    },
    text: 'Mommy ass fine',
  },
  {
    user: {
      location: 'Brooklyn, NY',
      avatar:
        'https://www.rollingstone.com/wp-content/uploads/2017/10/cardi-b-rolling-stone-interview-cover_.jpg?resize=1800,1200&w=1800',
      name: 'The Rock',
    },
    text: 'yaaaaa mane',
  },
  {
    user: {
      location: 'Brooklyn, NY',
      avatar:
        'https://sportsnaut.com/wp-content/uploads/2020/08/dwayne-johnson-the-rock-buy-xfl-15-million-696x547.jpg',
      name: 'The Rock',
    },
    text: 'Bloooooooood',
  },
];

function CurrentlyOnline({ user }: Props) {
  const theme = useContext(ThemeContext);
  return (
    <View
      style={{
        flex: 1,
        padding: theme.spacing,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Avatar
        size={80}
        rounded
        containerStyle={{ marginLeft: theme.spacing }}
        source={{
          uri: user.avatar,
        }}
      />
      <Badge
        status="success"
        badgeStyle={{ width: 15, height: 15, borderRadius: 15 }}
        containerStyle={{
          position: 'relative',
          width: 100,
          left: 32,
          top: -80,
        }}
      />
      <View style={{ justifyContent: 'center' }}>
        <Text style={{ fontFamily: theme.font.light }}>{user.name}</Text>
      </View>
    </View>
  );
}

export default function CurrentlyOnlineMain() {
  const [refresh, setRefresh] = useState(false);
  const onRefresh = () => {
    setRefresh(true);
    setRefresh(false);
  };

  const keyExtractor = (_: any, index: number) => index.toString();

  const renderItem = ({ item }: Item) => <CurrentlyOnline {...item} />;

  return (
    <FlatList
      refreshing={refresh}
      onRefresh={onRefresh}
      keyExtractor={keyExtractor}
      contentContainerStyle={{}}
      data={dummyList}
      renderItem={renderItem}
      numColumns={3}
    />
  );
}
