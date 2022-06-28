/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Props {
  uri: string;
  mediaType: 'image' | 'video';
}

const initialState: Props = {
  uri: '',
  mediaType: 'image',
};

const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    setUri(state, action: PayloadAction<Props>) {
      const { uri, mediaType } = action.payload;
      state.uri = uri;
      state.mediaType = mediaType;
    },
  },
});

export const { setUri } = cameraSlice.actions;

export default cameraSlice.reducer;
