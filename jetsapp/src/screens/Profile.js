import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('userData');
        console.log('Datos recuperados de AsyncStorage:', jsonValue);
        if (jsonValue != null) {
          const parsedData = JSON.parse(jsonValue);
          setUserData(parsedData);
        }
      } catch (error) {
        console.error('Error getting user data:', error);
      }
    };

    getUserData();
  }, []);

  const handleLogout = async () => {
    try {
      console.log('Iniciando proceso de cierre de sesión...');
      await AsyncStorage.clear();
      console.log('AsyncStorage limpiado exitosamente');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'No se pudo cerrar la sesión');
    }
  };

  if (!userData) {
    console.log('No hay datos de usuario disponibles');
    return (
      <View style={styles.container}>
        <Text>Cargando datos del usuario...</Text>
      </View>
    );
  }

  console.log('Renderizando perfil con datos:', userData);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>¡Bienvenido {userData.nombre_completo}!</Text>
      <Text style={styles.userInfo}>Usuario: @{userData.usuario}</Text>
      
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  userInfo: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#cf152d',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '80%',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Profile;