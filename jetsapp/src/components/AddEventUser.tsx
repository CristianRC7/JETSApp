import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { getApiUrl, API_CONFIG } from '../config/Config';
import EventCardSkeleton from './EventCardSkeleton';

const AddEventUser = ({ route, navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = route.params;

  useEffect(() => {
    fetchEnabledEvents();
  }, []);

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'America/La_Paz'
    });
  };


  const fetchEnabledEvents = async () => {
    try {
      console.log('Obteniendo los eventos de:', getApiUrl(API_CONFIG.ENDPOINTS.GET_ENABLED_EVENTS));
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.GET_ENABLED_EVENTS));
      const responseText = await response.text();
      console.log('Repuesta:', responseText);

      const data = JSON.parse(responseText);
      console.log('Datos parseados:', data);

      if (data.status === 'success') {
        setEvents(data.events || []);
      } else {
        console.error('Error:', data.message);
        Alert.alert('Error', 'No se pudieron cargar los eventos');
      }
    } catch (error) {
      console.error('Error al obtener los eventos:', error);
      Alert.alert('Error', 'Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleEventSelection = async (eventId) => {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.ADD_INSCRIPTION), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userData.id,
          eventId: eventId,
        }),
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);
      
      if (data.status === 'success') {
        Alert.alert('Éxito', 'Usuario inscrito correctamente', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        Alert.alert('Error', data.message || 'No se pudo inscribir al usuario');
      }
    } catch (error) {
      console.error('Error al agregar inscripccion:', error);
      Alert.alert('Error', 'Error al conectar con el servidor');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {[...Array(4)].map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{userData.nombre_completo}</Text>
        <Text style={styles.userDetail}>@{userData.usuario}</Text>
      </View>

      <Text style={styles.title}>Eventos Disponibles</Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.eventCard}
            onPress={() => handleEventSelection(item.id)}
          >
            <Text style={styles.eventTitle}>{item.descripcion}</Text>
            <Text style={styles.eventDetail}>Expositor: {item.expositor}</Text>
            <Text style={styles.eventDetail}>Lugar: {item.lugar}</Text>
            <Text style={styles.eventDetail}>
              Fecha: {formatDate(item.fecha)} 
            </Text>
            <Text style={styles.eventDetail}>
              Hora: {formatTime(item.hora)}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay eventos disponibles para hoy</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userDetail: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  eventCard: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  eventDetail: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 24,
  },
});

export default AddEventUser;