import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Calendar, Users, MapPin, FileText, Globe, Headset } from 'lucide-react-native';

const Home = ({ navigation }) => {
  const cards = [
    { title: 'Eventos', icon: Calendar, route: 'Events' },
    { title: 'Conferencistas', icon: Users, route: 'Exhibitors' },
    { title: 'Puntos de inscripción', icon: MapPin, route: 'Inscription' },
    { title: 'Formulario de eventos', icon: FileText, route: 'Form' },
    { 
      title: 'Visitar Página Web', 
      icon: Globe, 
      action: () => Linking.openURL('http://www.utepsa.edu/jets/') 
    },
    { title: 'Soporte', icon: Headset, route: 'Support' },
  ];

  const handleCardPress = (card) => {
    if (card.route) {
      navigation.navigate(card.route);
    } else if (card.action) {
      card.action();
    } else {
      console.log(`Navegando a ${card.title}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardsContainer}>
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => handleCardPress(card)}
            >
              <Icon size={32} color="#cf152d" />
              <Text style={styles.cardTitle}>{card.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsContainer: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '45%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: '2%',
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minHeight: 120,
  },
  cardTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
});

export default Home;