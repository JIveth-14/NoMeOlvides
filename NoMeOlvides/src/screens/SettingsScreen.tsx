import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useThemeContext } from '../../theme/ThemeContext';


export default function SettingsScreen() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Modo actual: {theme === 'dark' ? 'Oscuro' : 'Claro'}</Text>
      <Button title="Cambiar tema" onPress={toggleTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  text: {
    fontSize: 18,
  },
});
