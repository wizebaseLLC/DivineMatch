/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Icon } from 'react-native-elements';
import {
  Composer,
  Send,
  InputToolbarProps,
  ActionsProps,
  ComposerProps,
} from 'react-native-gifted-chat';
import {
  StyledActionIcon,
  StyledActions,
  StyledBubble,
  StyledInputToolbar,
} from '../styledComponents';

export const renderInputToolbar = (props: InputToolbarProps) => (
  // @ts-ignore
  <StyledInputToolbar {...props} />
);

export const renderActions = (props: ActionsProps) => (
  // @ts-ignore
  <StyledActions
    {...props}
    icon={() => (
      <StyledActionIcon name="camera" type="font-awesome" /*  color="#fff" */ />
    )}
    options={{
      Camera: () => {
        console.log('Camera');
      },
      'Choose From Library': () => {
        console.log('Choose From Library');
      },
      Cancel: () => {
        console.log('Cancel');
      },
    }}
  />
);

export const renderComposer = (props: ComposerProps) => (
  <Composer
    {...props}
    textInputStyle={{
      color: '#222B45',
      backgroundColor: '#EDF1F7',
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#E4E9F2',
      paddingTop: 8.5,
      paddingHorizontal: 12,
      marginLeft: 0,
    }}
  />
);

export const renderSend = (props: any) => {
  return (
    <Send
      {...props}
      disabled={!props.text}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
      }}
    >
      <Icon
        name="paper-plane"
        type="font-awesome"
        color="#FF0a44"
        reverse
        size={15}
        raised
        iconStyle={{ color: '#fff' }}
      />
    </Send>
  );
};

export const renderBubble = (props: any) => {
  return <StyledBubble {...props} />;
};
