import { Platform } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { colors, Theme } from 'react-native-elements';
import {
  theme as styledLightTheme,
  darkTheme as styledDarkTheme,
} from './theme';

const useCreateElementsTheme = (): Theme => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return {
    Button: {
      raised: true,
    },
    Card: {
      containerStyle: {
        backgroundColor: isDark
          ? styledDarkTheme.colors.paper
          : styledLightTheme.colors.paper,
      },
    },
    ListItem: {
      containerStyle: {
        backgroundColor: isDark
          ? styledDarkTheme.colors.paper
          : styledLightTheme.colors.paper,
      },
    },
    colors: {
      ...Platform.select({
        default: colors.platform.android,
        ios: colors.platform.ios,
      }),
    },
  };
};

export default useCreateElementsTheme;
