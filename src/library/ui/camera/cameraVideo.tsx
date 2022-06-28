/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-expressions */
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  Camera,
  CameraCapturedPicture,
  CameraRecordingOptions,
  CameraPictureOptions,
} from 'expo-camera';
import { Text, Icon, Button } from 'react-native-elements';
import * as MediaLibrary from 'expo-media-library';
import { ThemeContext } from 'styled-components';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { PostModalNavigationProp } from '../../../screens/activity';
import { setUri } from '../../../reduxStore/cameraReducer';

const { height } = Dimensions.get('window');

interface UiCameraProps {
  allowsVideo?: boolean;
}

interface CameraRefProps {
  takePictureAsync: (
    props?: Partial<CameraPictureOptions>,
  ) => Promise<CameraCapturedPicture>;
  recordAsync: (
    props?: Partial<CameraRecordingOptions>,
  ) => Promise<{ uri: string }>; // TODO what type is this?
  stopRecording: () => void;
  pausePreview: () => void;
  resumePreview: () => void;
}

const Container = styled.View`
  background-color: 'rgb(26,26,28)';
  flex: 1;
`;

const Toolbar = styled.View`
  position: absolute;
  align-self: flex-end;
  margin: ${props => props.theme.spacing * 2}px;
  margin-top: ${props => props.theme.spacing * 4}px;
`;

const RecordingText = styled(Text)`
  font-family: ${props => props.theme.font.light};
  font-size: 13px;
  color: #f71b1b;
  text-align: center;
  margin-top: ${props => props.theme.spacing * 2}px;
`;

const TakeImageButton = styled.View`
  height: 90px;
  width: 90px;
  align-self: center;
  justify-content: center;
  border-radius: 45px;
  border-color: #e6e3e3;
  border-width: 6px;
`;

const TakeImageHandler = styled.TouchableOpacity`
  height: 72px;
  width: 72px;
  align-self: center;
  border-radius: 40px;
  background-color: #e6e3e3;
`;

interface CameraIconProps {
  onPress: () => void;
  icon: string;
  style?: ViewStyle;
  iconType?: string;
}

const CameraIcon: React.FC<CameraIconProps> = ({
  onPress,
  icon,
  style,
  iconType,
}) => (
  <TouchableOpacity
    style={{
      alignSelf: 'center',
      height: 60,
      width: 60,
      borderRadius: 30,
      justifyContent: 'center',
      ...style,
    }}
    {...{ onPress }}
  >
    <Icon
      name={icon}
      type={iconType || 'font-awesome-5'}
      color="#e6e3e3"
      size={25}
    />
  </TouchableOpacity>
);

const UiCameraVideo: React.FunctionComponent<UiCameraProps> = props => {
  const { allowsVideo } = props;
  const theme = useContext(ThemeContext);
  const [hasPermission, setHasPermission] = useState(false);
  const [isFlashOn, setFlashOn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [currentUri, setCurrentUri] = useState<string | null>(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const confirmationPosition = useSharedValue(-height / 5);
  const videoButtonHeight = useSharedValue(72);
  const videoButtonRadius = useSharedValue(40);
  const ref = useRef<CameraRefProps>();
  const nav = useNavigation<PostModalNavigationProp>();
  const dispatch = useDispatch();

  const handleSetUri = (uri: string) => {
    dispatch(setUri({ mediaType: isVideoMode ? 'video' : 'image', uri }));
  };

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

  const onSetVideoPress = () => {
    setIsVideoMode(prev => !prev);
  };

  const onCaptureImage = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (!currentUri) {
      if (isVideoMode) {
        if (isRecording) {
          setIsRecording(true);
          ref.current?.stopRecording();
        } else if (status === 'granted') {
          setIsRecording(true);
          videoButtonHeight.value = withTiming(30, { duration: 700 });
          videoButtonRadius.value = withTiming(5, { duration: 700 });
          const video = await ref.current?.recordAsync({ maxDuration: 180000 });
          setIsRecording(false);
          videoButtonHeight.value = withTiming(70);
          videoButtonRadius.value = withTiming(40);
          if (video?.uri) {
            setCurrentUri(video.uri);
            await MediaLibrary.createAssetAsync(video.uri);
          }
        }
      } else {
        const image = await ref.current?.takePictureAsync();
        if (image) {
          setCurrentUri(image.uri);
          if (status === 'granted') {
            await MediaLibrary.createAssetAsync(image.uri);
          }
        }
      }
    }
  };

  const removeCurrentUri = () => {
    setCurrentUri(null);
  };

  const handleOkImage = (uri: string) => () => {
    handleSetUri(uri);
    nav.goBack();
  };

  const handleCloseCamera = () => {
    nav.goBack();
  };

  useEffect(() => {
    if (currentUri) {
      ref?.current?.pausePreview();
      confirmationPosition.value = withSpring(
        height / (isVideoMode ? 1.5 : 2.1),
      );
    } else {
      ref?.current?.resumePreview();
      confirmationPosition.value = withSpring(-height / 5);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUri, isVideoMode]);

  const animatedStyles = useAnimatedStyle(() => ({
    top: confirmationPosition.value,
  }));

  const animatedVideoButtonStyle = useAnimatedStyle(() => ({
    height: videoButtonHeight.value,
    width: videoButtonHeight.value,
    borderRadius: videoButtonRadius.value,
  }));

  const handleToggleFlash = () => {
    setFlashOn(prev => !prev);
  };

  const animatedZoom = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler<
    PinchGestureHandlerGestureEvent,
    { zoom: number }
  >({
    onStart: (_, ctx) => {
      ctx.zoom = animatedZoom.value;
    },
    onActive: (event, ctx) => {
      animatedZoom.value = ctx.zoom + event.scale;
      animatedZoom.value = interpolate(
        ctx.zoom + event.scale,
        [0, 10],
        [0, 0.5],
        Extrapolate.CLAMP,
      );

      runOnJS(setZoom)(animatedZoom.value);
    },
  });

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <PinchGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={{ flex: 1 }}>
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
                <Icon
                  name="times"
                  type="font-awesome-5"
                  color="#fff"
                  size={60}
                />
              }
              containerStyle={{ marginRight: theme.spacing * 3 }}
            />
            <Button
              buttonStyle={{ borderRadius: 50, width: 100, height: 100 }}
              onPress={handleOkImage(currentUri as string)}
              icon={
                <Icon
                  name="check"
                  type="font-awesome-5"
                  size={60}
                  color="#fff"
                />
              }
              containerStyle={{ marginLeft: theme.spacing * 3 }}
            />
          </Animated.View>
          {currentUri ? (
            isVideoMode ? (
              <Video
                style={{ flex: 1 }}
                source={{
                  uri: currentUri as string,
                }}
                useNativeControls
                resizeMode="cover"
                shouldPlay
              />
            ) : (
              <Image
                source={{ uri: currentUri as string }}
                style={{ flex: 1 }}
              />
            )
          ) : (
            <Camera
              style={{ flex: 1 }}
              type={type}
              zoom={zoom}
              ref={ref as any}
              flashMode={
                isFlashOn
                  ? Camera.Constants.FlashMode.on
                  : Camera.Constants.FlashMode.off
              }
            >
              {
                // GoBack
              }
              {!isRecording && (
                <CameraIcon
                  onPress={handleCloseCamera}
                  icon="times"
                  style={{
                    alignSelf: 'flex-start',
                    margin: theme.spacing * 2,
                    marginTop: theme.spacing * 4,
                  }}
                />
              )}
              <View
                style={{
                  flex: 2,
                }}
              />
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}
                onPress={onCaptureImage}
              >
                <TakeImageButton>
                  {isVideoMode ? (
                    <Animated.View
                      style={[
                        {
                          alignSelf: 'center',
                          backgroundColor: isVideoMode ? '#e71a1a' : '#e6e3e3',
                        },
                        animatedVideoButtonStyle,
                      ]}
                    />
                  ) : (
                    <TakeImageHandler onPress={onCaptureImage} />
                  )}
                </TakeImageButton>
                {isRecording && <RecordingText>Recording...</RecordingText>}
              </TouchableOpacity>
              {!isRecording && (
                <Toolbar>
                  <CameraIcon
                    onPress={handleToggleFlash}
                    icon={isFlashOn ? 'ios-flash' : 'ios-flash-off'}
                    iconType="ionicon"
                  />
                  <CameraIcon onPress={onPress} icon="sync" />

                  {allowsVideo && (
                    <CameraIcon
                      onPress={onSetVideoPress}
                      icon={isVideoMode ? 'camera' : 'video'}
                    />
                  )}
                </Toolbar>
              )}
            </Camera>
          )}
        </Container>
      </Animated.View>
    </PinchGestureHandler>
  );
};

export default UiCameraVideo;
