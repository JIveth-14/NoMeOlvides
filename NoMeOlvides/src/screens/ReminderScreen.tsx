import React from 'react';
import { View, Button, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useReminders } from '../../Context/ReminderContext';
import ReminderItem from '../Components/ReminderItem';
import { RootStackParamList } from '../Navigation/AppNavigator';

export default function ReminderScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { reminders } = useReminders();

  return (
    <View style={styles.container}>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReminderItem emoji={item.emoji} text={item.text} />}
      />
      <Button title="Agregar Recordatorio" onPress={() => navigation.navigate('AddReminder')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});