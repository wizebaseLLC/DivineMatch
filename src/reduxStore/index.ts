import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './combineReducers';

const store = configureStore({
  reducer: rootReducer,
});

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
}

export type AppDispatch = typeof store.dispatch;
export default store;
