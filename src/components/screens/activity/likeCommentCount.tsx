import React, { memo, useContext } from 'react';
import { useColorScheme, View } from 'react-native';
import { Badge, Icon } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ThemeContext } from 'styled-components';
import { LikeCommentCountView } from './styledComponents';

const LikeCommentCount = memo(() => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';
  const theme = useContext(ThemeContext);
  return (
    <LikeCommentCountView>
      <View style={{ marginLeft: theme.spacing }}>
        <Icon
          name="thumbs-up"
          type="font-awesome"
          size={17}
          solid
          color={isDarkMode ? '#fff' : 'grey'}
        />
        <Badge
          status="primary"
          value={400}
          containerStyle={{
            position: 'absolute',
            width: 50,
            left: 12,
          }}
        />
      </View>
      <View style={{ marginRight: theme.spacing * 4 }}>
        <FontAwesome5
          name="comment"
          size={17}
          solid
          color={isDarkMode ? '#fff' : 'grey'}
        />
        <Badge
          status="primary"
          value={20}
          containerStyle={{
            position: 'absolute',
            width: 50,
            left: 12,
          }}
        />
      </View>
    </LikeCommentCountView>
  );
});

export default LikeCommentCount;
