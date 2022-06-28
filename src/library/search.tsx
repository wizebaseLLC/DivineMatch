import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button, Icon } from 'react-native-elements';
import { RootStackParamList } from './navigator';

interface SearchIconProps {
  ops: {
    tintColor?: string | undefined;
  };
  isWhite?: boolean;
}

type SearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Search'
>;

/**
 * Icon used to take you to the Search page
 * @param props Options provided by React Navigation Header Right prop
 */
const SearchIcon = (props: SearchIconProps) => {
  const { ops, isWhite } = props;
  const navigation = useNavigation<SearchScreenNavigationProp>();

  const onPress = () => {
    navigation.navigate('Search');
  };
  return (
    <Button
      type="clear"
      style={{ paddingRight: 5 }}
      icon={
        <Icon
          name="search"
          type="font-awesome"
          color={isWhite ? '#fff' : undefined}
          {...ops}
        />
      }
      {...{ onPress }}
    />
  );
};

export default SearchIcon;
