import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl, API_CONFIG } from '../config/Config';
import Card from './Card';

const Survey = ({ route, navigation }) => {
  const { event } = route.params;
  const [selectedRating, setSelectedRating] = useState(null);

  const handleSubmit = async () => {
    if (!selectedRating) {
      Alert.alert('Error', 'Por favor seleccione una calificación');
      return;
    }
  
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.SUBMIT_SURVEY), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: parseInt(userId),
          eventId: event.id,
          rating: selectedRating,
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        Alert.alert('Éxito', 'Calificación enviada correctamente', [
          { 
            text: 'OK', 
            onPress: () => navigation.goBack()
          },
        ]);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Ocurrió un error al enviar la calificación');
    }
  };

  return (
    <View style={styles.container}>
      <Card event={event} showSurveyButton={false} />

      <View style={styles.ratingContainer}>
        <Text style={styles.ratingTitle}>Califica este evento:</Text>
        <View style={styles.buttonContainer}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <TouchableOpacity
              key={rating}
              style={[
                styles.ratingButton,
                selectedRating === rating && styles.selectedButton
              ]}
              onPress={() => setSelectedRating(rating)}
            >
              <Text style={[
                styles.ratingButtonText,
                selectedRating === rating && styles.selectedButtonText
              ]}>
                {rating}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  ratingContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 24,
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  ratingButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#cf152d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#cf152d',
  },
  ratingButtonText: {
    fontSize: 18,
    color: '#cf152d',
    fontWeight: '600',
  },
  selectedButtonText: {
    color: '#fff',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#666',
  },
  submitButton: {
    backgroundColor: '#cf152d',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Survey;