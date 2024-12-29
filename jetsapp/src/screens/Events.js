import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, Linking, RefreshControl } from 'react-native';
//Components
import DateFilterButton from '../components/DateFilterButton';
import EventCard from '../components/EventCard';
import EventCardSkeleton from '../components/EventCardSkeleton';
// Variblaes para la base de datos
import { getApiUrl, API_CONFIG } from '../config/Config';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2024-06-22'); 

  const dates = [
    { label: 'Día 1', date: '2024-06-22' },
    { label: 'Día 2', date: '2024-06-24' },
    { label: 'Día 3', date: '2024-06-25' },
    { label: 'Día 4', date: '2024-06-26' },
    { label: 'Día 5', date: '2024-06-27' },
    { label: 'Día 6', date: '2024-06-28' },
  ];

  const fetchEvents = async () => {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.GET_EVENTS));
      const data = await response.json();
      if (data.status === 'success') {
        setEvents(data.events);
      }
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleSchedulePress = () => {
    Linking.openURL('http://www.utepsa.edu/jets/');
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => event.fecha === selectedDate);

  const renderItem = ({ item }) => (
    <EventCard event={item} formatDate={formatDate} />
  );

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
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <View style={styles.buttonGrid}>
          <View style={styles.buttonRow}>
            <DateFilterButton
              label="Cronograma"
              onPress={handleSchedulePress}
              isActive={false}
            />
          </View>
          
          <View style={styles.buttonRow}>
            {dates.slice(0, 3).map((item) => (
              <DateFilterButton
                key={item.date}
                label={item.label}
                isActive={selectedDate === item.date}
                onPress={() => setSelectedDate(item.date)}
              />
            ))}
          </View>
          
          <View style={styles.buttonRow}>
            {dates.slice(3, 6).map((item) => (
              <DateFilterButton
                key={item.date}
                label={item.label}
                isActive={selectedDate === item.date}
                onPress={() => setSelectedDate(item.date)}
              />
            ))}
          </View>
        </View>
      </View>

      <FlatList
        data={filteredEvents}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.eventsContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  filterContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  buttonGrid: {
    paddingHorizontal: 16,
    gap: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  eventsContainer: {
    padding: 16,
  },
});

export default Events;