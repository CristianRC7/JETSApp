import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Award } from 'lucide-react-native';
import { getApiUrl, API_CONFIG } from '../config/Config';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchCertificates = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        throw new Error('Usuario no encontrado');
      }

      console.log('Enviando solicitud a:', getApiUrl(API_CONFIG.ENDPOINTS.GET_CERTIFICATES));
      
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.GET_CERTIFICATES), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ 
          userId: parseInt(userId) 
        }),
      });

      const responseText = await response.text();
      console.log('Respuesta del servidor (texto):', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Error al parsear respuesta:', parseError);
        throw new Error('Error en la respuesta del servidor');
      }

      console.log('Datos parseados:', data);

      if (data.success) {
        setCertificates(data.certificates);
      } else {
        throw new Error(data.message || 'Error al obtener certificados');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCertificates();
  };

  const renderCertificate = ({ item: cert }) => (
    <View style={styles.certificateCard}>
      <Award size={48} color="#cf152d" />
      <View style={styles.certificateInfo}>
        <Text style={styles.gestionText}>Gestión {cert.gestion}</Text>
        <Text style={styles.certificateNumber}>
          Certificado N° {cert.nro_certificado}
        </Text>
      </View>
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Award size={64} color="#666" />
      <Text style={styles.emptyText}>
        No tienes certificados disponibles
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#cf152d" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={certificates}
        renderItem={renderCertificate}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.content}
        ListEmptyComponent={renderEmptyComponent}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#cf152d',
    textAlign: 'center',
    fontSize: 16,
  },
  certificateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
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
  certificateInfo: {
    marginLeft: 16,
    flex: 1,
  },
  gestionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  certificateNumber: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    flex: 1,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default Certificates;