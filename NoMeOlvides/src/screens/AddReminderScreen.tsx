import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/AppNavigator';
import { useReminders } from '../../Context/ReminderContext';

export default function AddReminderScreen() {
  const [text, setText] = useState('');
  const [emoji, setEmoji] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { addReminder } = useReminders();
  const theme = useColorScheme(); // Detecta si es 'light' o 'dark'

  const isDark = theme === 'dark';

  const handleSave = () => {
    if (text.trim() === '' || emoji.trim() === '') {
      Alert.alert('Completa ambos campos');
      return;
    }
    addReminder({ id: Date.now().toString(), emoji, text });
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Emoji</Text>
      <TextInput
        style={[styles.input, { color: isDark ? '#fff' : '#000', backgroundColor: isDark ? '#222' : '#fff' }]}
        placeholder="Ej: 🔔"
        placeholderTextColor={isDark ? '#888' : '#aaa'}
        value={emoji}
        onChangeText={setEmoji}
      />
      <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Recordatorio</Text>
      <TextInput
        style={[styles.input, { color: isDark ? '#fff' : '#000', backgroundColor: isDark ? '#222' : '#fff' }]}
        placeholder="Ej: Llamar a mamá"
        placeholderTextColor={isDark ? '#888' : '#aaa'}
        value={text}
        onChangeText={setText}
      />
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
