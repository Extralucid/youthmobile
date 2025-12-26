// utils/getDeviceLanguage.ts
import { NativeModules, Platform } from 'react-native';

const getDeviceLanguageFallback = (): string => {
  try {
    // For iOS
    // if (Platform.OS === 'ios') {
    //   return (
    //     NativeModules.SettingsManager.settings.AppleLocale ||
    //     NativeModules.SettingsManager.settings.AppleLanguages[0] ||
    //     'en'
    //   ).substring(0, 2);
    // }
    
    // For Android
    return NativeModules.I18nManager.localeIdentifier.substring(0, 2) || 'en';
  } catch (error) {
    console.error('Failed to get device language:', error);
    return 'en';
  }
};

export const getDeviceLanguage = async (): Promise<string> => {
  try {
    // Try react-native-localize first
    const localize = await import('react-native-localize');
    return localize.getLocales()[0]?.languageCode || getDeviceLanguageFallback();
  } catch (error) {
    console.warn('react-native-localize not available, using fallback');
    return getDeviceLanguageFallback();
  }
};