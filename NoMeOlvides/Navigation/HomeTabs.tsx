import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ReminderScreen from '../screens/ReminderScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Recordatorios" component={ReminderScreen} />
      <Tab.Screen name="Ajustes" component={SettingsScreen} />
    </Tab.Navigator>
  );
}