import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, useColorScheme, Platform, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/AppNavigator';
import { useReminders } from '../../Context/ReminderContext';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddReminderScreen() {
  const [text, setText] = useState('');
  const [emoji, setEmoji] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { addReminder } = useReminders();
  const theme = useColorScheme();
  const isDark = theme === 'dark';

  const handleChangeDate = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleSave = async () => {
    if (text.trim() === '' || emoji.trim() === '') {
      Alert.alert('Completa todos los campos');
      return;
    }

    try {
      const response = await fetch('https://proyectobasebackend.onrender.com/api/reminder/newreminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emoji,
          text,
          date: date.toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Error', data.error || 'Error al guardar recordatorio');
        return;
      }

      // Actualizar contexto local con el id que devuelve Supabase
      addReminder({
        id: data.data[0].id.toString(), // Ajusta según cómo venga el id
        emoji,
        text,
        date: date.toISOString(),
      });

      Alert.alert('Éxito', 'Recordatorio guardado correctamente');
      navigation.goBack();

    } catch (error) {
      Alert.alert('Error de red', 'No se pudo conectar al servidor');
      console.error(error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Emoji</Text>
      <TextInput
        style={[
          styles.input,
          {
            color: isDark ? '#fff' : '#000',
            backgroundColor: isDark ? '#222' : '#fff',
          },
        ]}
        placeholder="Ej: 🔔"
        placeholderTextColor={isDark ? '#888' : '#aaa'}
        value={emoji}
        onChangeText={setEmoji}
      />

      <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Recordatorio</Text>
      <TextInput
        style={[
          styles.input,
          {
            color: isDark ? '#fff' : '#000',
            backgroundColor: isDark ? '#222' : '#fff',
          },
        ]}
        placeholder="Ej: Llamar a mamá"
        placeholderTextColor={isDark ? '#888' : '#aaa'}
        value={text}
        onChangeText={setText}
      />

      <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Fecha</Text>
      <Pressable onPress={() => setShowPicker(true)} style={[styles.input, { justifyContent: 'center' }]}>
        <Text style={{ color: isDark ? '#fff' : '#000' }}>{date.toLocaleDateString()}</Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChangeDate}
        />
      )}

      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});
