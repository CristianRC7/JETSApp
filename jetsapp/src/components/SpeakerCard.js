import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SpeakerCard = ({ image, name, title, location }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.speakerImage} />
      <Text style={styles.speakerName}>{name}</Text>
      <Text style={styles.speakerInfo}>{title}</Text>
      <Text style={styles.speakerInfo}>{location}</Text>
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
    alignItems: 'center',
  },
  speakerImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 16,
  },
  speakerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  speakerInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    textAlign: 'center',
  },
});

export default SpeakerCard; 