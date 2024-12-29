import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Award } from 'lucide-react-native';
import { getApiUrl, API_CONFIG } from '../config/Config';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        throw new Error('Usuario no encontrado');
      }

      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.GET_CERTIFICATES), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: parseInt(userId) }),
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (data.success) {
        setCertificates(data.certificates);
      } else {
        console.error('Error fetching certificates:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#cf152d" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {certificates.length > 0 ? (
          certificates.map((cert, index) => (
            <View key={index} style={styles.certificateCard}>
              <Award size={48} color="#cf152d" />
              <View style={styles.certificateInfo}>
                <Text style={styles.gestionText}>Gestión {cert.gestion}</Text>
                <Text style={styles.certificateNumber}>
                  Certificado N° {cert.nro_certificado}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Award size={64} color="#666" />
            <Text style={styles.emptyText}>
              No tienes certificados disponibles
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default Certificates;