import { combineReducers } from '@reduxjs/toolkit';
import cameraSlice from './cameraReducer';

export const rootReducer = combineReducers({ camera: cameraSlice });
export type RootState = ReturnType<typeof rootReducer>;
