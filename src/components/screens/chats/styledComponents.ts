import { Badge, Icon } from 'react-native-elements';
import { Actions, Bubble, InputToolbar } from 'react-native-gifted-chat';
import styled from 'styled-components/native';

export const StyledBadge = styled(Badge).attrs(props => ({
  badgeStyle: {
    backgroundColor: props.theme.colors.secondaryAlt,
    height: 10,
    width: 10,
    borderRadius: 15,
  },
}))``;

export const StyledActions = styled(Actions).attrs(props => ({
  containerStyle: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',

    marginLeft: 4,
    marginRight: 4,
    marginBottom: 0,
  },
  optionTintColor: props.theme.colors.fontColor,
}))``;

export const StyledActionIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.fontColor,
}))``;

export const ChatContainer = styled.View`
  flex: 1;
  /*   background-color: ${props => props.theme.colors.background}; */
`;

export const StyledBubble = styled(Bubble).attrs(props => ({
  textStyle: {
    left: {
      color: props.theme.colors.fontColor,
      fontFamily: props.theme.font.Raleway,
    },
    right: {
      color: '#fff',
      fontFamily: props.theme.font.Raleway,
    },
  },
  wrapperStyle: {
    left: {
      backgroundColor: props.theme.colors.paper,
    },
    right: {
      backgroundColor: props.theme.colors.primary,
    },
  },
}))``;

export const StyledInputToolbar = styled(InputToolbar).attrs(props => ({
  containerStyle: {
    backgroundColor: props.theme.colors.paper,
  },
  primaryStyle: { alignItems: 'center' },
}))``;
