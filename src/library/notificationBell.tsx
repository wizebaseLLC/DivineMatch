import React from 'react';
import { useColorScheme, View } from 'react-native';
import { Badge } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface Ops {
  ops: Tint;
  isWhite?: boolean;
}

type Tint = {
  tintColor?: string | undefined;
};

const Bell = ({ ops, isWhite }: Ops) => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';
  return (
    <View>
      <FontAwesome5
        name="bell"
        {...ops}
        size={25}
        // eslint-disable-next-line no-nested-ternary
        color={isWhite ? '#fff' : isDarkMode ? '#fff' : undefined}
      />
      <Badge
        status={isWhite ? 'primary' : 'error'}
        containerStyle={{
          position: 'absolute',
          top: -4,
          right: -2,
        }}
      />
    </View>
  );
};

export default Bell;
