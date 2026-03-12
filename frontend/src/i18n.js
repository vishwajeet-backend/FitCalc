import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/common.json';
import hi from './locales/hi/common.json';
import bn from './locales/bn/common.json';
import mr from './locales/mr/common.json';
import te from './locales/te/common.json';
import ta from './locales/ta/common.json';
import gu from './locales/gu/common.json';
import kn from './locales/kn/common.json';
import ml from './locales/ml/common.json';
import or_lang from './locales/or/common.json';
import pa from './locales/pa/common.json';
import as_lang from './locales/as/common.json';
import ur from './locales/ur/common.json';
import sa from './locales/sa/common.json';
import mai from './locales/mai/common.json';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  bn: { translation: bn },
  mr: { translation: mr },
  te: { translation: te },
  ta: { translation: ta },
  gu: { translation: gu },
  kn: { translation: kn },
  ml: { translation: ml },
  or: { translation: or_lang },
  pa: { translation: pa },
  as: { translation: as_lang },
  ur: { translation: ur },
  sa: { translation: sa },
  mai: { translation: mai },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'hi', 'bn', 'mr', 'te', 'ta', 'gu', 'kn', 'ml', 'or', 'pa', 'as', 'ur', 'sa', 'mai'],
    nonExplicitSupportedLngs: true,
    returnNull: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export const languageOptions = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'mr', label: 'मराठी' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'മലയാളം' },
  { code: 'or', label: 'ଓଡ଼ିଆ' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' },
  { code: 'as', label: 'অসমীয়া' },
  { code: 'ur', label: 'اردو' },
  { code: 'sa', label: 'संस्कृतम्' },
  { code: 'mai', label: 'मैथिली' },
];

export default i18n;
