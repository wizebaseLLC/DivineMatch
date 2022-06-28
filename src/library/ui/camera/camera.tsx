/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-expressions */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import {
  Camera,
  CameraCapturedPicture,
  CameraRecordingOptions,
  CameraPictureOptions,
} from 'expo-camera';
import { Text, Icon, Button } from 'react-native-elements';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';
import { ThemeContext } from 'styled-components';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import styled from 'styled-components/native';

const { height } = Dimensions.get('window');

interface UiCameraProps {
  handleSetUri: (uri: string) => void;
  handleCloseCamera: () => void;
}

interface CameraRefProps {
  takePictureAsync: (
    props?: Partial<CameraPictureOptions>,
  ) => Promise<CameraCapturedPicture>;
  recordAsync: (props?: Partial<CameraRecordingOptions>) => Promise<never>; // TODO what type is this?
  stopRecording: () => void;
  pausePreview: () => void;
  resumePreview: () => void;
}

export const Container = styled.SafeAreaView`
  background-color: 'rgb(26,26,28)';
  height: 100%;
  border-radius: 30px;
`;

interface ZoomProps {
  setValue: (value: number) => void;
}

export const ZoomPicker = (props: ZoomProps) => {
  const { setValue } = props;
  const buttonStyle = {
    width: 40,
    height: 60,
    marginLeft: 4,
    marginRight: 4,
  };

  const handleSetValue = (num: number) => () => {
    setValue(num);
  };
  return (
    <View style={{ marginTop: 8, flex: 0.3 }}>
      <Text style={{ color: '#fff', fontSize: 16, alignSelf: 'center' }}>
        Zoom
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Button
          title="1"
          type="clear"
          buttonStyle={buttonStyle}
          onPress={handleSetValue(0)}
        />
        <Button
          title="1.5"
          type="clear"
          buttonStyle={buttonStyle}
          onPress={handleSetValue(0.25)}
        />

        <Button
          title="2"
          type="clear"
          buttonStyle={buttonStyle}
          onPress={handleSetValue(0.5)}
        />
      </View>
    </View>
  );
};

const UiCamera: React.FunctionComponent<UiCameraProps> = props => {
  const { handleSetUri, handleCloseCamera } = props;
  const theme = useContext(ThemeContext);
  const [hasPermission, setHasPermission] = useState(false);
  const [isFlashOn, setFlashOn] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [currentUri, setCurrentUri] = useState<string | null>(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const confirmationPosition = useSharedValue(-height / 5);

  const ref = useRef<CameraRefProps>();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const onPress = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    );
  };

  const onCaptureImage = async () => {
    if (!currentUri) {
      const image = await ref.current?.takePictureAsync();
      if (image) {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          image.uri,
          [{ resize: { width: 800 } }],
        );

        setCurrentUri(manipulatedImage.uri);
        if (status === 'granted') {
          await MediaLibrary.createAssetAsync(image.uri);
        }
      }
    }
  };

  const removeCurrentUri = () => {
    setCurrentUri(null);
  };

  const handleOkImage = (uri: string) => () => {
    handleSetUri(uri);
    handleCloseCamera();
  };

  useEffect(() => {
    if (currentUri) {
      ref?.current?.pausePreview();
      confirmationPosition.value = withSpring(height / 2.1);
    } else {
      ref?.current?.resumePreview();
      confirmationPosition.value = withSpring(-height / 5);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUri]);

  const animatedStyles = useAnimatedStyle(() => ({
    top: confirmationPosition.value,
  }));

  const handleSetZoom = (value: number) => {
    setZoom(value);
  };

  const handleToggleFlash = () => {
    setFlashOn(prev => !prev);
  };
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Container>
      <Animated.View
        style={[
          {
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 1,
            flexDirection: 'row',
            alignSelf: 'center',
          },
          animatedStyles,
        ]}
      >
        <Button
          buttonStyle={{
            borderRadius: 50,
            backgroundColor: 'red',
            width: 100,
            height: 100,
          }}
          onPress={removeCurrentUri}
          icon={
            <Icon name="times" type="font-awesome-5" color="#fff" size={60} />
          }
          containerStyle={{ marginRight: theme.spacing * 3 }}
        />
        <Button
          buttonStyle={{ borderRadius: 50, width: 100, height: 100 }}
          onPress={handleOkImage(currentUri as string)}
          icon={
            <Icon name="check" type="font-awesome-5" size={60} color="#fff" />
          }
          containerStyle={{ marginLeft: theme.spacing * 3 }}
        />
      </Animated.View>
      {currentUri ? (
        <Image source={{ uri: currentUri as string }} style={{ flex: 3 }} />
      ) : (
        <Camera
          style={{ flex: 3 }}
          type={type}
          zoom={zoom}
          ref={ref as any}
          flashMode={
            isFlashOn
              ? Camera.Constants.FlashMode.on
              : Camera.Constants.FlashMode.off
          }
        >
          <TouchableOpacity
            style={{
              alignSelf: 'flex-start',
              backgroundColor: 'rgba(0,0,0,.3)',
              height: 60,
              width: 60,
              borderRadius: 30,
              margin: 16,
              justifyContent: 'center',
            }}
            onPress={handleToggleFlash}
          >
            <Icon
              name={isFlashOn ? 'ios-flash' : 'ios-flash-off'}
              type="ionicon"
              color="#e6e3e3"
              size={30}
            />
          </TouchableOpacity>
        </Camera>
      )}
      <ZoomPicker {...{ setValue: handleSetZoom }} />
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            backgroundColor: 'rgba(0,0,0,.3)',
            height: 60,
            width: 60,
            borderRadius: 30,
            justifyContent: 'center',
          }}
          onPress={handleCloseCamera}
        >
          <Icon name="times" type="font-awesome-5" color="#e6e3e3" size={30} />
        </TouchableOpacity>
        <View
          style={{
            height: 90,
            width: 90,
            backgroundColor: '#e6e3e3',
            alignSelf: 'center',
            justifyContent: 'center',
            borderRadius: 45,
          }}
        >
          <TouchableOpacity
            style={{
              height: 80,
              width: 80,
              backgroundColor: '#e6e3e3',
              alignSelf: 'center',
              borderRadius: 40,
              borderColor: '#000000',
              borderWidth: 3,
            }}
            onPress={onCaptureImage}
          />
        </View>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            backgroundColor: 'rgba(10,10,10,.3)',
            height: 60,
            width: 60,
            borderRadius: 30,
            justifyContent: 'center',
          }}
          {...{ onPress }}
        >
          <Icon name="sync" type="font-awesome-5" color="#e6e3e3" size={30} />
        </TouchableOpacity>
      </View>
    </Container>
  );
};
export default UiCamera;
