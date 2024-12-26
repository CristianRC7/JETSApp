import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, ScrollView, Linking, RefreshControl } from 'react-native';
import { getApiUrl, API_CONFIG } from '../config/Config';
import DateFilterButton from '../components/DateFilterButton';
import EventCard from '../components/EventCard';
import EventCardSkeleton from '../components/EventCardSkeleton';

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
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.buttonScrollContainer}
        >
          <DateFilterButton
            label="Cronograma"
            onPress={handleSchedulePress}
            isActive={false}
          />
          {dates.map((item) => (
            <DateFilterButton
              key={item.date}
              label={item.label}
              isActive={selectedDate === item.date}
              onPress={() => setSelectedDate(item.date)}
            />
          ))}
        </ScrollView>
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
  buttonScrollContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  eventsContainer: {
    padding: 16,
  },
});

export default Events;