import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, img} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/AppNavigator';

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });


  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = () => {
    return email.trim() !== '' && isValidEmail(email) && password.trim() !== '';
  };

  const handleLogin = () => {
    if (!isFormValid()) {
      Alert.alert('Error', 'Por favor completa los campos correctamente.');
    } else {
      navigation.navigate('HomeTabs');
    }
  };

  return (

    <View style={styles.container}>
      <Text style={styles.title}>NoMeOlvides</Text>
      <img src="assets/icon.png" alt="Logo" />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        onBlur={() => setTouched({ ...touched, email: true })}
        keyboardType="email-address"
        autoCapitalize="none"
      />
  

      {touched.email && email.trim() === '' && (
        <Text style={styles.errorText}>El correo es obligatorio.</Text>
      )}
      {touched.email && email.trim() !== '' && !isValidEmail(email) && (
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
      {touched.password && password.trim() === '' && (
        <Text style={styles.errorText}>La contraseña es obligatoria.</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Ingresar"
          onPress={handleLogin}
          disabled={!isFormValid()}
          color={isFormValid() ? '#007AFF' : '#AAB2BD'}
        />
      </View>
    </View>
  );
}
 <div>
        <img src="assets/ico.png" alt="Logo" />
      </div>
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
    width: '100%',
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
  buttonContainer: {
    width: '100%',
    marginTop: 15,
  },
});
