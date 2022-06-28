import { ListItem } from 'react-native-elements';
import styled from 'styled-components/native';

export const MessageText = styled(ListItem.Subtitle)`
  font-family: ${props => props.theme.font.Raleway};
`;

export const DateText = styled(ListItem.Subtitle)`
  font-family: ${props => props.theme.font.light};
  font-size: 11px;
  opacity: 0.8;
  padding-top: ${props => props.theme.spacing / 2}px;
`;
