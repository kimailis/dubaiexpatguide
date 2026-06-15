import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enUI from './locales/en/ui.json';
import ruUI from './locales/ru/ui.json';
import deUI from './locales/de/ui.json';
import frUI from './locales/fr/ui.json';
import esUI from './locales/es/ui.json';

import enData from './locales/en/data.json';
import ruData from './locales/ru/data.json';
import deData from './locales/de/data.json';
import frData from './locales/fr/data.json';
import esData from './locales/es/data.json';

import enGuide from './locales/en/guide.json';
import ruGuide from './locales/ru/guide.json';
import deGuide from './locales/de/guide.json';
import frGuide from './locales/fr/guide.json';
import esGuide from './locales/es/guide.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { ui: enUI, data: enData, guide: enGuide },
      ru: { ui: ruUI, data: ruData, guide: ruGuide },
      de: { ui: deUI, data: deData, guide: deGuide },
      fr: { ui: frUI, data: frData, guide: frGuide },
      es: { ui: esUI, data: esData, guide: esGuide }
    },
    lng: 'en',
    fallbackLng: 'en',
    defaultNS: 'ui',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
