
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, useWindowDimensions, Pressable, TextInput, ToastAndroid, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useReminders } from '../../Context/ReminderContext';
import ReminderItem from '../Components/ReminderItem';
import { RootStackParamList } from '../Navigation/AppNavigator';
import { MaterialIcons } from '@expo/vector-icons';

export default function ReminderScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { reminders, updateReminder, addReminder, deleteReminder } = useReminders();
  const { width } = useWindowDimensions();
  const numColumns = width < 400 ? 1 : 3;
  const [editingReminder, setEditingReminder] = useState<string | null>(null);
  const [editEmoji, setEditEmoji] = useState('');
  const [editText, setEditText] = useState('');
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  useEffect(() => {
    if (hoveredItemId) {
      const timer = setTimeout(() => setHoveredItemId(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [hoveredItemId]);

  return (
    <View style={styles.container}>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <Pressable
            onHoverIn={() => setHoveredItemId(item.id)}
            onHoverOut={() => setHoveredItemId(null)}
            onLongPress={() => setHoveredItemId(item.id)}
            style={styles.gridItem}
          >
            <ReminderItem emoji={item.emoji} text={item.text} />
            {hoveredItemId === item.id && (
              <TouchableOpacity
                style={styles.editIconButton}
                onPress={() => {
                  setEditingReminder(item.id);
                  setEditEmoji(item.emoji);
                  setEditText(item.text);
                }}
              >
                <MaterialIcons name="edit" size={20} color="#fff" />
              </TouchableOpacity>
            )}
          </Pressable>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          if (Platform.OS === 'android') {
            ToastAndroid.show('Abriendo formulario para nuevo recordatorio', ToastAndroid.SHORT);
          } else {
            Alert.alert('Nuevo', 'Abriendo formulario para nuevo recordatorio');
          }
          navigation.navigate('AddReminder');
        }}
      >
        <Text style={styles.addButtonText}>Agregar Recordatorio</Text>
      </TouchableOpacity>
      {editingReminder && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Editar Recordatorio</Text>
            <TextInput
              style={styles.input}
              placeholder="Emoji"
              value={editEmoji}
              onChangeText={setEditEmoji}
            />
            <TextInput
              style={styles.input}
              placeholder="Texto"
              value={editText}
              onChangeText={setEditText}
            />
            <View style={{ flexDirection: 'row', marginTop: 16 }}>
              <TouchableOpacity
                onPress={() => {
                  setEditingReminder(null);
                  setEditEmoji('');
                  setEditText('');
                }}
                style={[styles.closeModalButton, { backgroundColor: '#ccc', marginRight: 8 }]}
              >
                <Text style={styles.closeModalText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  const trimmedEmoji = editEmoji.trim();
                  const trimmedText = editText.trim();

                  if (!trimmedEmoji || !trimmedText) {
                    if (Platform.OS === 'android') {
                      ToastAndroid.show('Completa todos los campos', ToastAndroid.SHORT);
                    } else {
                      Alert.alert('Error', 'Completa todos los campos');
                    }
                    return;
                  }

                  const updatedReminders = reminders.map(reminder =>
                    reminder.id === editingReminder
                      ? { ...reminder, emoji: trimmedEmoji, text: trimmedText }
                      : reminder
                  );
                  
                  updateReminder(editingReminder, { emoji: trimmedEmoji, text: trimmedText });
                  
                  if (Platform.OS === 'android') {
                    ToastAndroid.show('Recordatorio actualizado', ToastAndroid.SHORT);
                  } else {
                    Alert.alert('Éxito', 'Recordatorio actualizado');
                  }

                  setEditingReminder(null);
                  setEditEmoji('');
                  setEditText('');
                }}
                style={styles.closeModalButton}
              >
                <Text style={styles.closeModalText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F4FF',
    alignItems: 'center',
  },
  gridItem: {
    flex: 1,
    padding: 8,
    maxWidth: '50%',
    position: 'relative',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editIconButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF9500',
    padding: 6,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeModalButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  closeModalText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});