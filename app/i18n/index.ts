import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';

export const i18n = createInstance({
  lng: 'ko', // Set the default language to Korean
  fallbackLng: 'ko',
  defaultNS: 'common',
  ns: ['common'],
  //debug: true,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
});

i18n
  .use(initReactI18next)
  .use(resourcesToBackend((language: string, namespace: string) => import(`../../public/locales/${language}/${namespace}.json`)))
  .init();
