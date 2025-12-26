// components/TranslatedText.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextStyle } from 'react-native';

interface TranslatedTextProps {
  i18nKey: string;
  style?: TextStyle;
  values?: Record<string, unknown>;
}

const TranslatedText: React.FC<TranslatedTextProps> = ({
  i18nKey,
  style,
  values,
}) => {
  const { t } = useTranslation();

  return <Text style={style}>{t(i18nKey, values)}</Text>;
};

export default TranslatedText;