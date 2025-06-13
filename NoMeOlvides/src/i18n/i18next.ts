import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
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
  lng: 'es',
  fallbackLng: 'es',
  interpolation: { escapeValue: false },
});

export default i18n;
