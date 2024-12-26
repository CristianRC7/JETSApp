import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MapPin, Clock, School, Monitor, NotebookPen } from 'lucide-react-native';

const LocationCard = ({ title, location, schedule, icon: Icon }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Icon size={24} color="#cf152d" />
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
    <View style={styles.cardContent}>
      <View style={styles.locationRow}>
        <MapPin size={16} color="#666" style={styles.miniIcon} />
        <Text style={styles.cardText}>{location}</Text>
      </View>
      <View style={styles.scheduleRow}>
        <Clock size={16} color="#666" style={styles.miniIcon} />
        <Text style={styles.cardText}>{schedule}</Text>
      </View>
    </View>
  </View>
);

const Inscription = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.priceCard}>
          <Text style={styles.priceTitle}>Costo de Inscripción</Text>
          <Text style={styles.price}>Bs. 130</Text>
          <Text style={styles.priceDescription}>
            Tu adhesión incluye:
          </Text>
          <View style={styles.benefitsList}>
            <Text style={styles.benefitItem}>• Participación en todas las actividades</Text>
            <Text style={styles.benefitItem}>• Certificado del evento</Text>
            <Text style={styles.benefitItem}>• Polera conmemorativa</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Puntos de Inscripción</Text>

        <LocationCard
          title="Servicio de Atención Estudiantil"
          location="Planta baja del bloque Este"
          schedule="08:00 AM - 19:00 PM"
          icon={NotebookPen}
        />

        <LocationCard
          title="Secretaría de tu Facultad"
          location="2do piso del bloque Este"
          schedule="09:00 AM - 16:00 PM"
          icon={School}
        />

        <LocationCard
          title="Laboratorio de Sistemas"
          location="Segundo piso del Bloque Norte"
          schedule="08:00 AM - 13:00 PM y 18:00 PM - 21:00 PM"
          icon={Monitor}
        />
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
  priceCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  priceTitle: {
    fontSize: 18,
    color: '#333',
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  price: {
    fontSize: 36,
    color: '#cf152d',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  priceDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    fontWeight: '600',
  },
  benefitsList: {
    marginTop: 8,
  },
  benefitItem: {
    fontSize: 15,
    color: '#666',
    marginBottom: 6,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.84,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
    marginLeft: 12,
  },
  cardContent: {
    marginTop: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniIcon: {
    marginRight: 8,
  },
  cardText: {
    fontSize: 15,
    color: '#666',
    flex: 1,
  },
});

export default Inscription;
