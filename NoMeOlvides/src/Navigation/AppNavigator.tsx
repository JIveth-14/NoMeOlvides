import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeTabs from './HomeTabs';
import AddReminderScreen from '../screens/AddReminderScreen';

export type RootStackParamList = {
  Login: undefined;
  HomeTabs: undefined;
  AddReminder: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
      <Stack.Screen name="AddReminder" component={AddReminderScreen} />
    </Stack.Navigator>
  );
}