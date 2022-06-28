/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styled, { ThemeContext } from 'styled-components/native';
import { Video } from 'expo-av';
import { ListItem, Icon } from 'react-native-elements';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useNavigation, useRoute } from '@react-navigation/native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useSelector } from 'react-redux';
import BottomSheetText from './text';
import {
  StyledListItem,
  WhiteOverlay,
  StyledDivider,
} from '../../../../library/ui';
import {
  PostModalNavigationProp,
  PostModalScreenRouteProp,
} from '../../../../screens/activity';
import { BackgroundComponent, Choices, sharedActions } from './header';
import Flair from './flair';
import Tag from './tag';
import { RootState } from '../../../../reduxStore/combineReducers';

const { width } = Dimensions.get('window');

interface ImageResult {
  cancelled: boolean;
  height: number;
  type: 'image' | 'video';
  uri: string;
  width: number;
  duration?: number;
}

const Container = styled.ScrollView.attrs(() => ({
  keyboardShouldPersistTaps: 'handled',
}))``;

const ListView = styled.View`
  justify-content: space-between;
`;

const ImageContainer = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const handleImageSelection = async () => {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return null;
    }

    const result = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: undefined,
      videoMaxDuration: 300,
    })) as ImageResult;
    return result;
  }
  return null;
};
const actions = [
  { id: 'library', title: 'Library', icon: 'images', color: '#52de69' },
  { id: 'camera', title: 'Camera', icon: 'camera', color: '#007AE1' },
  ...sharedActions,
];

type ActionsType = 'library' | 'camera' | 'tag' | 'flair';
const sheetOptions = ['Remove', 'Cancel'];
const cancelButtonIndex = 1;

const ImageVideo = () => {
  const theme = useContext(ThemeContext);
  const { showActionSheetWithOptions } = useActionSheet();

  const nav = useNavigation<PostModalNavigationProp>();
  const route = useRoute<PostModalScreenRouteProp>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [currentItem, setCurrentItem] = useState<Choices>('tag');
  const snapPoints = useMemo(() => [0, '95%'], []);
  const { uri: cameraShotUri, mediaType } = useSelector(
    (state: RootState) => state.camera,
  );
  console.log({ cameraShotUri, mediaType });

  useEffect(() => {
    if (cameraShotUri && mediaType) {
      nav.setParams({
        media: {
          uri: cameraShotUri,
          type: mediaType,
        },
      });
    }
  }, [cameraShotUri, mediaType]);

  const onPress = (action: ActionsType) => () => {
    switch (action) {
      case 'library':
        (async () => {
          const selectedMedia = await handleImageSelection();
          if (selectedMedia && selectedMedia?.uri) {
            nav.setParams({
              media: {
                uri: selectedMedia.uri,
                type: selectedMedia.type,
              },
            });
          }
        })();
        break;
      case 'camera':
        nav.navigate('CameraWithVideo');
        break;

      case 'tag':
        setCurrentItem('tag');
        bottomSheetRef?.current?.expand();
        Keyboard.dismiss();
        break;

      case 'flair':
        setCurrentItem('flair');
        bottomSheetRef?.current?.expand();
        Keyboard.dismiss();
        break;

      default:
        break;
    }
  };

  const onPressImage = () => {
    showActionSheetWithOptions(
      {
        options: sheetOptions,
        cancelButtonIndex,
        destructiveButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          nav.setParams({
            media: undefined,
          });
        }
      },
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Container>
        <BottomSheetText hasMedia>
          <ImageContainer>
            <TouchableOpacity
              onPress={Keyboard.dismiss}
              style={{ padding: 1 }}
              onLongPress={onPressImage}
            >
              {route?.params?.media?.type === 'image' ? (
                <Image
                  source={{ uri: route?.params?.media?.uri }}
                  style={{
                    height: width,
                    width,
                  }}
                />
              ) : (
                route?.params?.media?.type === 'video' && (
                  <Video
                    style={{
                      height: width,
                      width,
                    }}
                    source={{
                      uri: route?.params?.media?.uri,
                    }}
                    useNativeControls
                    resizeMode="cover"
                  />
                )
              )}
            </TouchableOpacity>
          </ImageContainer>
        </BottomSheetText>
      </Container>
      <ListView>
        {actions.map(x => (
          <View key={x.id}>
            <StyledListItem onPress={onPress(x.id as ActionsType)}>
              <Icon name={x.icon} type="font-awesome-5" color={x.color} />
              <ListItem.Content>
                <ListItem.Title
                  style={{ fontFamily: theme.font.normal, fontSize: 12 }}
                >
                  {x.title}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
              <WhiteOverlay borderRadius={0} />
            </StyledListItem>
            <StyledDivider />
          </View>
        ))}
      </ListView>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={BottomSheetBackdrop}
        backgroundComponent={BackgroundComponent}
      >
        {currentItem === 'tag' && <Tag />}
        {currentItem === 'flair' && <Flair />}
      </BottomSheet>
    </View>
  );
};

export default ImageVideo;
