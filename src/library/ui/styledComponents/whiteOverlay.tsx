import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import React from 'react';

const Overlay = styled.View<{ borderRadius: number; bottom: boolean }>`
  border-radius: ${props => (props.bottom ? 0 : props.borderRadius)}px;
  border-bottom-left-radius: ${props =>
    props.bottom ? props.borderRadius : 0}px;
  border-bottom-right-radius: ${props =>
    props.bottom ? props.borderRadius : 0}px;
  background-color: rgba(255, 255, 255, 0.05);
`;

interface Props {
  borderRadius: number;
  isOnlyBottomRadius?: boolean;
}
const WhiteOverlay: React.FC<Props> = ({
  borderRadius,
  isOnlyBottomRadius,
}) => (
  <Overlay
    style={StyleSheet.absoluteFillObject}
    {...{ bottom: !!isOnlyBottomRadius, borderRadius }}
  />
);

export default WhiteOverlay;
