import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const EventFormCard = ({ event, onSurveyPress }) => {
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{event.descripcion}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>Hora: {formatTime(event.hora)}</Text>
        <Text style={styles.detail}>Lugar: {event.lugar}</Text>
        <Text style={styles.detail}>Expositor: {event.expositor}</Text>
      </View>
      
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
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  detailsContainer: {
    gap: 8,
  },
  detail: {
    fontSize: 14,
    color: '#666',
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

export default EventFormCard;