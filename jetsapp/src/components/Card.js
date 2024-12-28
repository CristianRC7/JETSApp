import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const Card = ({ event, onSurveyPress, showSurveyButton = false }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{event.descripcion}</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detail}>
          <Text style={styles.label}>Expositor:</Text>
          <Text style={styles.value}>{event.expositor}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Lugar:</Text>
          <Text style={styles.value}>{event.lugar}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Hora:</Text>
          <Text style={styles.value}>{formatTime(event.hora)}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Fecha:</Text>
          <Text style={styles.value}>{formatDate(event.fecha)}</Text>
        </View>
      </View>
      
      {showSurveyButton && (
        <>
          {event.status === 'Responder Encuesta' && (
            <TouchableOpacity 
              style={styles.button}
              onPress={() => onSurveyPress(event)}
            >
              <Text style={styles.buttonText}>Responder Encuesta</Text>
            </TouchableOpacity>
          )}
          
          {event.status === 'Encuesta Enviada' && (
            <Text style={styles.completedText}>Encuesta Completada</Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  detailsContainer: {
    gap: 8,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    width: 80,
  },
  value: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  button: {
    backgroundColor: '#cf152d',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  completedText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default Card;