import React, { useContext } from 'react';
import { View } from 'react-native';
import { Avatar, ListItem, Text } from 'react-native-elements';
import { ThemeContext } from 'styled-components';
import { StyledDivider, StyledListItem } from '../../../../library/ui';

type List = {
  key: string;
  value: string;
}[];

interface CreateListProps {
  list: List;
  title: string;
}

const CreateList: React.FunctionComponent<CreateListProps> = props => {
  const { list, title } = props;
  const theme = useContext(ThemeContext);
  return (
    <View style={{ paddingTop: theme.spacing * 2 }}>
      <Text
        style={{
          fontFamily: theme.font.light,
          paddingLeft: theme.spacing,
          paddingBottom: theme.spacing,
        }}
      >
        {title}
      </Text>
      {list.map((l, i, a) => (
        <View key={i}>
          <StyledListItem>
            {i === 0 && (
              <Avatar
                rounded
                source={{
                  uri:
                    'https://www.rollingstone.com/wp-content/uploads/2017/10/cardi-b-rolling-stone-interview-cover_.jpg?resize=1800,1200&w=1800',
                }}
              />
            )}
            <ListItem.Content>
              <ListItem.Title style={{ fontFamily: theme.font.normal }}>
                {l.key}
              </ListItem.Title>
            </ListItem.Content>
            <Text> {l.value}</Text>
            <ListItem.Chevron />
          </StyledListItem>
          {i + 1 !== a.length && <StyledDivider />}
        </View>
      ))}
    </View>
  );
};

export default CreateList;
