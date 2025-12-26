// types/language.ts
export interface LanguageState {
  currentLanguage: string;
  isLoading: boolean;
  supportedLanguages: string[];
}

export type LanguagePayload = {
  language?: string;
  isLoading?: boolean;
};