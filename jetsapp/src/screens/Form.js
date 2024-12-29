import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
//Components
import EventFormCard from '../components/EventFormCard';
import EventCardSkeleton from '../components/EventCardSkeleton';
// Variables para la base de datos
import { getApiUrl, API_CONFIG } from '../config/Config';

const Form = ({ navigation, route }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEvents = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      console.log('UserId recuperado:', userId);
      
      if (!userId) {
        throw new Error('Usuario no encontrado');
      }

      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.GET_FORMS), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: parseInt(userId) }),
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);
      
      if (data.success) {
        setEvents(data.eventos);
      } else {
        console.error('Error fetching events:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchEvents();
    }, [])
  );

  const handleSurveyPress = (event) => {
    navigation.navigate('Survey', { event });
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchEvents();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.eventsContainer}>
          {[...Array(4)].map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {events.length > 0 ? (
          events.map((event) => (
            <EventFormCard
              key={event.id}
              event={event}
              onSurveyPress={handleSurveyPress}
            />
          ))
        ) : (
          <Text style={styles.noEventsText}>
            No hay eventos disponibles
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noEventsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 24,
  },
});

export default Form;