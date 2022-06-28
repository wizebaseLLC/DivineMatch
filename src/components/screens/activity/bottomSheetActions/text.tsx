/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-escape */
import React, { useContext, useRef, useState } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { MentionInput } from 'react-native-controlled-mentions';
import {
  Dimensions,
  useColorScheme,
  TextInput,
  Pressable,
  Keyboard,
  View,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { LinkPreview } from '@flyerhq/react-native-link-preview';
import BottomSheetHeader from './header';
import {
  PostModalNavigationProp,
  PostModalScreenRouteProp,
} from '../../../../screens/activity';
import { RenderHashTags, RenderSuggestions } from './mentions';

const { height } = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.paper};
`;

interface BottomSheetTextProps {
  hasMedia?: boolean;
}
export const parseUrl = (text: string) => {
  return text.match(
    /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.(xn--)?[a-z0-9-]{2,20}\b([-a-zA-Z0-9@:%_\+\[\],.~#?&\/=]*[-a-zA-Z0-9@:%_\+\]~#?&\/=])*/gi,
  );
};

const BottomSheetText: React.FunctionComponent<BottomSheetTextProps> = props => {
  const { hasMedia, children } = props;
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const theme = useContext(ThemeContext);
  const nav = useNavigation<PostModalNavigationProp>();
  const route = useRoute<PostModalScreenRouteProp>();
  const ref = useRef<TextInput>();
  const [url, setUrl] = useState<string | null>(null);

  const handleSetValue = (message: string) => {
    const urls = parseUrl(message);
    if (urls?.[0]) {
      setUrl(urls[0]);
    } else {
      setUrl(null);
    }
    if (message) nav.setParams({ message });
  };
  const handlePress = () => {
    ref?.current?.focus();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: hasMedia ? undefined : theme.colors.paper,
      }}
    >
      <Pressable
        style={{ flex: hasMedia ? 1 : 0.4 }}
        onPress={Keyboard.dismiss}
      >
        <Container>
          <BottomSheetHeader hasMedia={hasMedia} />
          <Pressable onPress={handlePress}>
            <View style={{ zIndex: 1 }}>
              <MentionInput
                value={route.params.message || ''}
                autoFocus={!hasMedia}
                inputRef={ref as any}
                onChange={handleSetValue}
                style={{ color: theme.colors.text }}
                placeholderTextColor={isDark ? 'darkgrey' : undefined}
                containerStyle={{
                  padding: 8,
                  minHeight: height * 0.15,
                  maxHeight: height * 0.45,
                  backgroundColor: theme.colors.paper,
                }}
                /*          multiline={false} */
                placeholder={
                  hasMedia
                    ? 'Describe your charming photos'
                    : 'Introduce yourself'
                }
                partTypes={[
                  {
                    trigger: '@',
                    renderSuggestions: RenderSuggestions,
                    isInsertSpaceAfterMention: true,
                    isBottomMentionSuggestionsRender: true,
                    textStyle: { color: theme.colors.secondary },
                  },
                  {
                    trigger: '#',
                    renderSuggestions: RenderHashTags,
                    isInsertSpaceAfterMention: true,
                    isBottomMentionSuggestionsRender: true,
                    textStyle: { color: theme.colors.secondaryAlt },
                  },
                  {
                    pattern: /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.(xn--)?[a-z0-9-]{2,20}\b([-a-zA-Z0-9@:%_\+\[\],.~#?&\/=]*[-a-zA-Z0-9@:%_\+\]~#?&\/=])*/gi,
                    textStyle: { color: theme.colors.secondary },
                  },
                ]}
              />
            </View>
            <View style={{ zIndex: 0 }}>
              {children}
              {url && (
                <LinkPreview
                  text={url}
                  containerStyle={{ backgroundColor: '#fff' }}
                />
              )}
            </View>
          </Pressable>
        </Container>
      </Pressable>
    </View>
  );
};

export default BottomSheetText;
