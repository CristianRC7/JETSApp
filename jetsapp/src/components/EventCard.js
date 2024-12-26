import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  
  if (hour < 12) {
    return `${hour}:${minutes} AM`;
  } else if (hour === 12) {
    return `12:${minutes} PM`;
  } else {
    return `${hour}:${minutes} PM`;
  }
};

const EventCard = ({ event, formatDate }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.description}>{event.descripcion}</Text>
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
  description: {
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
});

export default EventCard;