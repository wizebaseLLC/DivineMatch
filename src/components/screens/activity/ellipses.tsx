import React, { memo, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import { Button } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { EllipseView } from './styledComponents';

const options = ['Match', 'Follow', 'View', 'Block User', 'Cancel'];
const destructiveButtonIndex = 3;
const cancelButtonIndex = 4;

const Ellipses = memo(() => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';
  const { showActionSheetWithOptions } = useActionSheet();

  const onPress = useCallback(() => {
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      buttonIndex => {
        console.log({ buttonIndex });
      },
    );
  }, [showActionSheetWithOptions]);

  return (
    <>
      <EllipseView>
        <Button
          type="clear"
          onPress={onPress}
          icon={
            <FontAwesome5
              name="ellipsis-h"
              size={25}
              color={isDarkMode ? '#fff' : 'grey'}
            />
          }
        />
      </EllipseView>
    </>
  );
});

export default Ellipses;
