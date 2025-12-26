// store/languageSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store/store';
import { getDeviceLanguage } from '../utils/languageDetector';

interface LanguageState {
  currentLanguage: string;
  isLoading: boolean;
  supportedLanguages: string[];
}

const initialState: LanguageState = {
  currentLanguage: 'en',
  isLoading: true,
  supportedLanguages: ['en', 'es'], // Add your supported languages
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.currentLanguage = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLanguage, setLoading } = languageSlice.actions;

export const initializeLanguage = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const language = await getDeviceLanguage(initialState.supportedLanguages);
    dispatch(setLanguage(language));
  } catch (error) {
    console.error('Language initialization failed:', error);
  } finally {
    dispatch(setLoading(false));
  }
};

export default languageSlice.reducer;