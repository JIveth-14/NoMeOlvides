import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/AppNavigator';
import { MaterialIcons } from '@expo/vector-icons';

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simula 2 segundos de carga

    return () => clearTimeout(timeout);
  }, []);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = () => {
    return (
      (email ?? '').trim() !== '' &&
      isValidEmail(email ?? '') &&
      (password ?? '').trim() !== ''
    );
  };

  const handleLogin = async () => {
    Keyboard.dismiss();

    if (!isFormValid()) {
      Alert.alert('Error', 'Por favor completa los campos correctamente.');
      return;
    }

    try {
      console.log('Iniciando sesión...');
      const response = await fetch('https://proyectobasebackend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Error', data.error || 'Error al iniciar sesión');
        setEmail('');
        setPassword('');
        setIsAllowed(false);
        return;
      }

      if (data.user) {
        setEmail(data?.user?.email ?? '');
        setIsAllowed(true);
        Alert.alert('Éxito', 'Inicio de sesión exitoso');
        navigation.navigate('HomeTabs');
      } else {
        Alert.alert('Error', 'Credenciales incorrectas o incompletas');
      }

    } catch (error: any) {
      Alert.alert('Error', 'Error al conectar con el servidor: ' + error.message);
      setEmail('');
      setPassword('');
      setIsAllowed(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ fontSize: 18 }}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icon.jpeg')}
        style={{ width: 100, height: 100, marginBottom: 20 }}
      />
      <Text style={styles.title}>NoMeOlvides</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        onBlur={() => setTouched({ ...touched, email: true })}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {touched.email && (email ?? '').trim() === '' && (
        <Text style={styles.errorText}>El correo es obligatorio.</Text>
      )}
      {touched.email && (email ?? '').trim() !== '' && !isValidEmail(email ?? '') && (
        <Text style={styles.errorText}>Formato de correo no válido.</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        onBlur={() => setTouched({ ...touched, password: true })}
        secureTextEntry
      />
      {touched.password && (password ?? '').trim() === '' && (
        <Text style={styles.errorText}>La contraseña es obligatoria.</Text>
      )}

      <TouchableOpacity
        style={[
          styles.customButton,
          { backgroundColor: isFormValid() ? '#007AFF' : '#AAB2BD' },
        ]}
        onPress={handleLogin}
      >
        <MaterialIcons name="login" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={{ color: '#fff', fontSize: 16 }}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F0F4FF',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    maxWidth: 320,
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  errorText: {
    width: '100%',
    color: '#D9534F',
    fontSize: 13,
    marginBottom: 5,
    marginTop: -5,
  },
  customButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginTop: 20,
  },
});
