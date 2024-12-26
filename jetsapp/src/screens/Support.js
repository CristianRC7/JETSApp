import React from "react";
import { View, Text, Image, StyleSheet } from 'react-native';
import icono from '../../assets/icono.png';

const Support = () => {
  return (
    <View style={styles.container}>
      <Image source={icono} style={styles.icono} />
      <Text style={styles.title}>Bienvenido a la aplicación JETS UTEPSA</Text>
      <Text style={styles.text}>En caso de presentar algún inconveniente puedes contactarte al siguiente correo:</Text>
      <Text style={styles.email}>soporte.campusvirtual@utepsa.edu</Text>
      <Text style={styles.text}>Santa Cruz - 2024</Text>
      <Text style={styles.text}>CTE</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  icono: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#cf152d',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Support;