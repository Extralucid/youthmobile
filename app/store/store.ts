// store/store.ts
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
//import languageReducer from '../slices/languageSlice';

export const store = configureStore({
  reducer: {
    //language: languageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;