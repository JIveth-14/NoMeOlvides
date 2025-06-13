import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import  AppNavigator  from './src/Navigation/AppNavigator';
import { ReminderProvider } from './Context/ReminderContext';
import { ThemeProvider, useThemeContext } from './theme/ThemeContext';

function Main() {
  const { theme } = useThemeContext();

  return (
    <NavigationContainer theme={theme === 'light' ? DefaultTheme : DarkTheme}>
      <ReminderProvider>
        <AppNavigator />
      </ReminderProvider>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}