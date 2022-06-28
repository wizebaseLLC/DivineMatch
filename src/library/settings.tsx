import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import IconButtonDM from './iconButton';
import { RootStackParamList } from './navigator';

type SettingsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Settings'
>;

const SettingsIcon = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const onPress = () => {
    navigation.navigate('Settings');
  };
  return (
    <IconButtonDM name="cog" onPress={onPress} size={15} overrideReverse />
  );
};

export default SettingsIcon;
