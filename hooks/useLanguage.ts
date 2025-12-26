// hooks/useLanguage.ts
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '../app/slices/languageSlice';
import { AppDispatch, RootState } from '../app/store/store';

export const useLanguage = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { currentLanguage, supportedLanguages, isLoading } = useSelector(
        (state: RootState) => state.language
    );

    const setLanguage = async (language: string) => {
        await dispatch(changeLanguage(language));
        // Additional logic after language change if needed
    };

    return {
        currentLanguage,
        supportedLanguages,
        isLoading,
        setLanguage,
    };
};