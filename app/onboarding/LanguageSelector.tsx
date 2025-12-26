// components/LanguageSelector.tsx
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '../slices/languageSlice';
import { AppDispatch, RootState } from '../store/store';

const LanguageSelector: React.FC = () => {
  const { currentLanguage, supportedLanguages } = useSelector(
    (state: RootState) => state.language
  );

const dispatch = useDispatch<AppDispatch>();

  const handleLanguageChange = async (language: string) => {
    await dispatch(changeLanguage(language));
    // Additional logic after language change if needed
  };

  return (
    <View style={styles.container}>
      {supportedLanguages.map((lang) => (
        <Button
          key={lang}
          title={lang.toUpperCase()}
          onPress={() => handleLanguageChange(lang)}
          disabled={currentLanguage === lang}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
});

export default LanguageSelector;