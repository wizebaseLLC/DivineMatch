import React, { useContext, useState } from 'react';
import { Dimensions, Image, Platform } from 'react-native';

import {
  Avatar,
  Text,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Accessory,
  Overlay,
} from 'react-native-elements';
import styled, { ThemeContext } from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';
import * as FaceDetector from 'expo-face-detector';
import { useToast } from 'react-native-styled-toast';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { UICamera } from '../../../../library/ui';
import { FormProps } from '../initialWizard';

const { width } = Dimensions.get('window');

const Container = styled.ScrollView`
  background-color: ${props => props.theme.colors.paper};
`;

const MultiImageContainer = styled.View`
  flex-direction: row;
`;
const ImageContainer = styled.View`
  align-items: center;
  margin-top: ${props => props.theme.spacing}px;
`;

const HeaderText = styled(Text).attrs(() => ({
  h4: true,
}))`
  font-family: ${props => props.theme.font.heading};
  padding-left: ${props => props.theme.spacing / 2}px;
  max-width: ${width}px;
  padding: ${props => props.theme.spacing}px;
  align-self: center;
  margin-top: ${props => props.theme.spacing}px;
`;

const GalleryText = styled(Text)`
  font-family: ${props => props.theme.font.subHeading};
  color: ${props => props.theme.colors.secondary};
  font-size: 18px;
`;

const Description = styled(Text)<{ color: string }>`
  font-size: 18px;
  font-family: ${props => props.theme.font.subHeading};
  padding: ${props => props.theme.spacing}px;
  align-self: center;
  color: ${props => props.color || props.theme.colors.secondary};
`;

const Warning = styled(Text)`
  font-size: 15px;
  font-family: ${props => props.theme.font.heading};
  margin-top: ${props => props.theme.spacing * 3}px;
  align-self: center;
  color: ${props => props.theme.colors.error};
`;

const LogoImage = styled(Image)`
  height: 70px;
  width: 70px;
  align-self: center;
`;

interface Props {
  formProps: FormProps;
  isUpdatingProfile?: boolean;
}

interface ImageResult {
  cancelled: boolean;
  height: number;
  type: string;
  uri: string;
  width: number;
}

type CamLibraryType = 'Camera' | 'Library';

const handleImageSelection = async () => {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return null;
    }

    const result = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: undefined,
    })) as ImageResult;

    return result;
    /*  return ImageManipulator.manipulateAsync(result.uri, [
      { resize: { width: 800 } },
    ]); */
  }
  return null;
};

type Elements =
  | 'gallery1'
  | 'gallery2'
  | 'gallery3'
  | 'gallery4'
  | 'profilepic';

const errorMessageNoFace = 'Your face is required in this image';
const errorMessageMutliFace = 'Only 1 face is permitted';
const subMessage = 'This will help others know who they are looking at!';

interface ImageAvatar {
  uri: string;
  onPress?: () => void;
  padding?: number;
  rounded?: boolean;
  size?: 'large' | 'xlarge' | 'medium' | 'small';
  showAccessory?: boolean;
}
const AvatarDM = (props: ImageAvatar) => {
  const { uri, padding, rounded, size, showAccessory, onPress } = props;
  const theme = useContext(ThemeContext);

  return (
    <Avatar
      rounded={rounded}
      onPress={onPress}
      size={size || 'large'}
      containerStyle={
        showAccessory
          ? {
              margin: padding,
            }
          : {
              margin: padding,
              shadowColor: 'black',
              shadowOffset: { width: -1, height: -3 },
              shadowRadius: 2,
              shadowOpacity: 0.1,
            }
      }
      overlayContainerStyle={{
        borderRadius: 15,
      }}
      icon={
        uri.length > 0 ? undefined : { name: 'user', type: 'font-awesome-5' }
      }
      source={{
        uri: uri.length > 0 ? uri : undefined,
      }}
    >
      {showAccessory && (
        <Accessory
          {...{
            size: 16,
            color: theme.colors.actionBlue,
            reverse: true,
            iconProps: { size: 18, color: '#fff' },
          }}
        />
      )}
    </Avatar>
  );
};

const Step5: React.FunctionComponent<Props> = props => {
  const { formProps, isUpdatingProfile } = props;
  const { handleChange, values } = formProps;
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState<{
    isVisible: boolean;
    e: Elements | undefined;
  }>({ isVisible: false, e: undefined });
  const theme = useContext(ThemeContext);
  const { toast } = useToast();
  const { showActionSheetWithOptions } = useActionSheet();

  const options: FaceDetector.DetectionOptions = {
    mode: FaceDetector.Constants.Mode.accurate,
  };

  const handleSetUri = (e?: Elements) => async (uri: string) => {
    if (e) {
      const faceDetection = await FaceDetector.detectFacesAsync(uri, options);
      /*   if (faceDetection?.faces?.length >= 0) { */
      handleChange(e)(uri);
      /*   } else {
        toast({
          message:
            faceDetection?.faces?.length > 1
              ? errorMessageMutliFace
              : errorMessageNoFace,
          intent: 'ERROR',
          duration: 8000,
          shouldVibrate: true,
          subMessage,
        });
      } */
      setIsBottomSheetVisible({ isVisible: false, e: undefined });
    }
  };

  const handleCloseCamera = () => {
    setIsBottomSheetVisible({ isVisible: false, e: undefined });
  };

  const handleGalleryChange = async (e: Elements, title: CamLibraryType) => {
    if (title === 'Library') {
      const result = await handleImageSelection();

      if (result && e) {
        const faceDetection = await FaceDetector.detectFacesAsync(
          result.uri,
          options,
        );
        /*    if (faceDetection?.faces?.length > 0) { */
        handleChange(e)(result.uri);
        /*  } else {
          toast({
            message: errorMessageNoFace,
            intent: 'ERROR',
            duration: 8000,
            shouldVibrate: true,
            subMessage,
          });
        } */
      }
    } /* if (onBottomSheetPress && removeBottomSheet) */ else {
      ({ isVisible: true, e });
    }
  };

  const sheetOptions = ['Take new Photo', 'Choose From Library', 'Cancel'];
  const cancelButtonIndex = 2;

  const handlePressImage = (el: Elements) => async () => {
    showActionSheetWithOptions(
      {
        options: sheetOptions,
        cancelButtonIndex,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            handleGalleryChange(el, 'Camera');

            break;
          case 1:
            handleGalleryChange(el, 'Library');

            break;
          default:
            break;
        }
      },
    );
  };
  return (
    <Container>
      <Overlay
        isVisible={isBottomSheetVisible.isVisible}
        fullScreen
        overlayStyle={{ flex: 1, backgroundColor: 'rgb(26,26,28)' }}
      >
        <UICamera
          {...{
            handleCloseCamera,
            handleSetUri: handleSetUri(isBottomSheetVisible?.e),
          }}
        />
      </Overlay>
      {!isUpdatingProfile && (
        <>
          <LogoImage
            source={require('../../../../../assets/images/icon.png')}
          />
          <HeaderText>Show off your charming looks!</HeaderText>
        </>
      )}
      <ImageContainer>
        <AvatarDM
          {...{
            onPress: handlePressImage('profilepic'),
            uri: values.profilepic,
            rounded: true,
            showAccessory: true,
          }}
        />

        <Description color="">Profile Pic</Description>
      </ImageContainer>

      <ImageContainer>
        <MultiImageContainer>
          <AvatarDM
            {...{
              onPress: handlePressImage('gallery1'),
              uri: values.gallery1,
              padding: theme.spacing,
              size: 'xlarge',
            }}
          />
          <AvatarDM
            {...{
              onPress: handlePressImage('gallery2'),
              uri: values.gallery2,
              padding: theme.spacing,
              size: 'xlarge',
            }}
          />
        </MultiImageContainer>
        <GalleryText>Your Gallery</GalleryText>
        <MultiImageContainer>
          <AvatarDM
            {...{
              onPress: handlePressImage('gallery3'),
              uri: values.gallery3,
              padding: theme.spacing,
              size: 'xlarge',
            }}
          />
          <AvatarDM
            {...{
              onPress: handlePressImage('gallery4'),
              uri: values.gallery4,
              padding: theme.spacing,
              size: 'xlarge',
            }}
          />
        </MultiImageContainer>
      </ImageContainer>

      {!values.profilepic && (
        <Warning>You must atleast select a Profile Picture to continue</Warning>
      )}
    </Container>
  );
};

export default Step5;
