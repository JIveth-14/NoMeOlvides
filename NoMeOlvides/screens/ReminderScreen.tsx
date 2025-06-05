import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import CustomReminder from '../Components/CustomReminder';


const reminders = [
  { id: '1', text: '📱 Llevar cargador' },
  { id: '2', text: '📚 Regresar libro' },
  { id: '3', text: '🚰 Cerrar la llave' },
];

export default function ReminderScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus Recordatorios</Text>
      <FlatList
        data={reminders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <CustomReminder text={item.text} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});