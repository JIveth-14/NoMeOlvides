import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useThemeContext } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useThemeContext();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {t('Cambiar Tema ')}: {theme === 'dark' ? t('dark') : t('light')}
      </Text>
      <Button title={t('Cambiar')} onPress={toggleTheme} />
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
});
