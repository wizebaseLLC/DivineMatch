import React from 'react';
import Ripple from 'react-native-material-ripple';
import { useColorScheme } from 'react-native';
import { Icon } from 'react-native-elements';
import { SwiperView } from '../components/screens/home/styledComponents';
import { theme } from './theme';

interface Props {
  size?: number;
  color?: string;
  onPress: () => void;
  name: string;
  overrideReverse?: boolean;
  disabled?: boolean;
}

/**
 * Icon used to take you to the settings page
 * @param props Props of Icon
 */
const IconButtonDM = (props: Props) => {
  const { color, size, onPress, name, overrideReverse, disabled } = props;
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return (
    <SwiperView>
      <Icon
        type="font-awesome-5"
        {...{
          Component: Ripple,
          name,
          disabled,
          onPress,
          raised: true,
          size: size || 16,
          reverse: overrideReverse ? true : isDark,
          color: color || theme.colors.actionBlue,
          iconStyle: {
            color:
              isDark || overrideReverse
                ? '#fff'
                : color || theme.colors.actionBlue,
          },
        }}
      />
    </SwiperView>
  );
};

export default IconButtonDM;
