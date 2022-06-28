import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Button } from 'react-native-elements';
import { ThemeContext } from 'styled-components';
import { RootStackParamList } from './navigator';
import Bell from './notificationBell';

interface IconProps {
  ops: {
    tintColor?: string | undefined;
  };
  isWhite?: boolean;
}

type NavigationProp = StackNavigationProp<RootStackParamList, 'Notifications'>;

/**
 * Icon used to take you to the settings page
 * @param props Options provided by React Navigation Header Right prop
 */
const NotificationsIcon = (props: IconProps) => {
  const { ops, isWhite } = props;
  const navigation = useNavigation<NavigationProp>();
  const theme = useContext(ThemeContext);

  const onPress = () => {
    navigation.navigate('Notifications');
  };
  return (
    <Button
      type="clear"
      style={{ paddingRight: theme.spacing }}
      icon={<Bell {...{ ops }} {...{ isWhite }} />}
      {...{ onPress }}
    />
  );
};

export default NotificationsIcon;
