import React from 'react';
import Animated from 'react-native-reanimated';

export type SnapTo = { snapTo: (number: number) => void } | null;

export interface RenderContent {
  render: () => React.ReactNode;
  snapPoints: React.ReactText[];
}

export type Render = () => React.ReactNode;

interface Props {
  sheetRef: React.MutableRefObject<SnapTo>;
  renderContent: () => React.ReactNode;
  snapPoints: React.ReactText[];
  fall: Animated.Value<number>;
  onBottomSheetPress: (props: RenderContent) => void;
  removeBottomSheet: () => void;
}

export const BottomSheetContext = React.createContext<Partial<Props>>({});
