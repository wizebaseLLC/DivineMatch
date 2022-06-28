import React, { useContext, useRef, useMemo, useCallback } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ThemeContext } from 'styled-components';
import { FloatingAction, IActionProps } from 'react-native-floating-action';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Keyboard, Pressable, StyleSheet, View } from 'react-native';

const actions: IActionProps[] = [
  {
    color: '#9b59b6',
    text: 'Text',
    icon: <FontAwesome5 name="pencil-alt" size={18} color="#fff" />,
    name: 'text',
  },
  {
    color: '#3498db',
    text: 'Video',
    icon: <FontAwesome5 name="video" size={18} color="#fff" />,
    name: 'video',
  },
  {
    color: '#1abc9c',
    text: 'Image',
    icon: <FontAwesome5 name="camera" size={18} color="#fff" />,
    name: 'image',
  },
];

const BackgroundComponent = () => {
  const theme = useContext(ThemeContext);
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: theme.colors.paper,
        borderRadius: 0,
      }}
    />
  );
};

export type PressItemType = 'text' | 'video' | 'image';
const ActionButton = () => {
  const theme = useContext(ThemeContext);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [0, '100%'], []);

  const onPressItem = () => {
    bottomSheetRef?.current?.expand();
  };
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <>
      <FloatingAction
        color={theme.colors.primary}
        actions={actions}
        onPressItem={onPressItem}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={BottomSheetBackdrop}
        backgroundComponent={BackgroundComponent}
      >
        <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss} />
      </BottomSheet>
    </>
  );
};

export default ActionButton;
