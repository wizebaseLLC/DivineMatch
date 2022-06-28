/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { Text, Tile, Button } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ThemeContext } from 'styled-components';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
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

function MatchCard({ user }: Props) {
  const theme = useContext(ThemeContext);
  return (
    <Tile
      imageSrc={{ uri: user.avatar }}
      title={user.name}
      titleStyle={{
        fontFamily: theme.font.subHeading,
        marginTop: -theme.spacing,
      }}
      containerStyle={{
        padding: theme.spacing,
      }}
      imageContainerStyle={{ borderRadius: 14 }}
      height={height * 0.3}
      width={width / 2}
    >
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <Text style={{ fontFamily: theme.font.light }}>{user.location}</Text>
        <Button
          style={{ marginTop: -9 }}
          type="clear"
          icon={
            <FontAwesome5
              name="heart"
              size={20}
              color={theme.colors.secondary}
            />
          }
        />
      </View>
    </Tile>
  );
}

export default function ViewMore() {
  const [refresh, setRefresh] = useState(false);
  const onRefresh = () => {
    setRefresh(true);
    setRefresh(false);
  };

  const keyExtractor = (_: any, index: number) => index.toString();

  const renderItem = ({ item }: Item) => <MatchCard {...item} />;

  return (
    <FlatList
      refreshing={refresh}
      onRefresh={onRefresh}
      keyExtractor={keyExtractor}
      data={dummyList}
      renderItem={renderItem}
      numColumns={2}
    />
  );
}
