import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat, IMessage, User } from 'react-native-gifted-chat';
import { Dimensions, Platform } from 'react-native';
import { ChatScreenRouteProp } from '../../../../screens/chat';
import { ChatContainer } from '../styledComponents';
import {
  renderActions,
  renderComposer,
  renderInputToolbar,
  renderSend,
  renderBubble,
} from './renderChatProps';

function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896)
  );
}
/**
 * Renders the Chat Ui
 */
const InChat = () => {
  const route = useRoute<ChatScreenRouteProp>();
  const [messages, setMessages] = useState<Partial<IMessage>[]>([{}]);
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        image: route.params.avatar,
        user: {
          _id: 2,
          name: 'React Native',
          avatar: route.params.avatar,
        },
      },
    ]);
  }, [route.params.avatar]);

  const onSend = useCallback(
    (value: IMessage[]) => {
      console.log({ messages: value?.[0] });
      const withImage = { ...value?.[0], image: route.params.avatar };
      setIsTyping(false);
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages as IMessage[], [withImage]),
      );
    },
    [route.params.avatar],
  );

  const onInputTextChanged = () => {
    if (!isTyping) setIsTyping(true);
    setTimeout(() => {
      if (isTyping) setIsTyping(false);
    }, 5000);
  };

  const onPressAvatar = (user: User) => {
    console.log(user);
  };
  return (
    <ChatContainer>
      <GiftedChat
        {...{
          messages: messages as IMessage[],
          onSend,
          onInputTextChanged,
          user: { _id: 1 },
          isTyping,
          onPressAvatar,

          renderInputToolbar,
          renderActions,
          renderComposer,
          renderSend,
          renderBubble,
          bottomOffset: isIphoneX() ? 78 : 50, // TODO check if this the same for nonIphone10 devices.  ios10 is 78,
        }}
      />
    </ChatContainer>
  );
};

export default InChat;
