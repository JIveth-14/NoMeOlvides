import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeContext } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useThemeContext();
  const textColor = theme === 'dark' ? '#FFFFFF' : '#000000';

  const setCustomColors = (themeOption: { name: string; backgroundColor: string; textColor: string }) => {
    console.warn('setCustomColors not implemented', themeOption);
  };
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <View style={[styles.container]}>
      <Text style={[styles.text, { color: textColor }]}>{t('current_mode')}: {theme === 'dark' ? t('dark') : t('light')}</Text>
      <Button title={t('toggle_theme')} onPress={toggleTheme} />

      <Text style={[styles.text, { marginTop: 30, color: textColor }]}>{t('choose_language')}</Text>
      <View style={styles.languageButtons}>
        <Button title="Español" onPress={() => changeLanguage('es')} />
        <Button title="English" onPress={() => changeLanguage('en')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  colorButton: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    width: 200,
    alignItems: 'center',
  },
  languageButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
});
