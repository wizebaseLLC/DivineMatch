import React, { useContext } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ThemeContext } from 'styled-components';
import { FloatingAction, IActionProps } from 'react-native-floating-action';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenNavigationProp } from '../login/components/loginFooter';

const actions: IActionProps[] = [
  {
    color: '#9b59b6',
    text: 'Text',
    icon: <FontAwesome5 name="pencil-alt" size={18} color="#fff" />,
    name: 'text',
  },
  {
    color: '#1abc9c',
    text: 'Image / Video',
    icon: <FontAwesome5 name="camera" size={18} color="#fff" />,
    name: 'image',
  },
];

export type PressItemType = 'text' | 'video' | 'image';

export const Container = styled(BottomSheetView)`
  background-color: red;
`;

const ActionButton = () => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const onPressItem = (id: PressItemType) => {
    navigation.navigate('PostModal', { id });
  };

  return (
    <>
      <FloatingAction
        color={theme.colors.primary}
        actions={actions}
        // @ts-ignore
        onPressItem={onPressItem}
      />

      {/*       <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={BottomSheetBackdrop}
        backgroundComponent={BackgroundComponent}
      >
        <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
          <BottomSheetSwitch sheetType={currentPressItem} />
        </Pressable>
      </BottomSheet> */}
    </>
  );
};

export default ActionButton;
