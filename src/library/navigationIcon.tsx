import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Button, Icon } from 'react-native-elements';
import { ThemeContext } from 'styled-components';
import { RootStackParamList } from './navigator';

type Route = keyof RootStackParamList;
interface SearchIconProps {
  route: Route | 'GoBack';
  icon: string;
  isWhite?: boolean;
  ops?: {
    tintColor?: string | undefined;
  };
}

type SearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  Route
>;

/**
 * Icon used to take you to a page
 * @param props Options provided by React Navigation Header Right prop
 */
const NavigationIcon = (props: SearchIconProps) => {
  const { ops, isWhite, route, icon } = props;
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const isGoBack = route === 'GoBack';
  const theme = useContext(ThemeContext);
  const onPress = () => {
    if (route === 'GoBack') {
      navigation.goBack();
    } else {
      navigation.navigate(route);
    }
  };

  return (
    <Button
      type="clear"
      title={isGoBack ? 'Go Back' : undefined}
      titleStyle={{ color: '#fff', fontFamily: theme.font.RalewayBoldItalic }}
      iconRight
      icon={
        <Icon
          name={icon}
          type="font-awesome-5"
          color={isWhite ? '#fff' : undefined}
          style={{ marginLeft: isGoBack ? 5 : 0 }}
          {...ops}
        />
      }
      {...{ onPress }}
    />
  );
};

export default NavigationIcon;
