import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        current_mode: 'Current Mode',
        dark: 'Dark',
        light: 'Light',
        toggle_theme: 'Toggle Theme',
        choose_color: 'Choose Color',
        choose_language: 'Choose Language',
      },
    },
    es: {
      translation: {
        current_mode: 'Modo Actual',
        dark: 'Oscuro',
        light: 'Claro',
        toggle_theme: 'Cambiar Tema',
        choose_color: 'Elegir Color',
        choose_language: 'Elegir Idioma',
      },
    },
  },
  lng: 'en', // idioma por defecto
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
