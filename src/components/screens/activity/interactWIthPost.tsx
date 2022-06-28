import React, { memo } from 'react';
import { useColorScheme } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { CardActionView, StyledInteractButton } from './styledComponents';

const InteractWithPost = memo(() => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';

  return (
    <CardActionView>
      <StyledInteractButton
        title="Like"
        icon={
          <FontAwesome5
            name="thumbs-up"
            size={20}
            color={isDarkMode ? '#fff' : 'grey'}
          />
        }
        onPress={() => console.log('hi')}
      />
      <StyledInteractButton
        type="clear"
        title="Comment"
        icon={
          <FontAwesome5
            name="comment"
            size={20}
            color={isDarkMode ? '#fff' : 'grey'}
          />
        }
        onPress={() => console.log('hi')}
      />
      <StyledInteractButton
        type="clear"
        title="Match"
        icon={
          <FontAwesome5
            name="heart"
            size={20}
            color={isDarkMode ? '#fff' : 'grey'}
          />
        }
        onPress={() => console.log('hi')}
      />
    </CardActionView>
  );
});

export default InteractWithPost;
