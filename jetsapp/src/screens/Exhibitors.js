import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SpeakerCard from '../components/SpeakerCard';

const speakers = [
  {
    image: 'https://i.postimg.cc/ZqvCgG0J/david-capistran.png',
    name: 'Conferencista: David Capistán',
    title: 'Doctor en Ciencias Administrativas',
    location: 'Tec. de Monterrey - México 🇲🇽'
  },
  {
    image: 'https://i.postimg.cc/zGZzvyfY/javier-aroztegui.png',
    name: 'Conferencista: Javier Aroztegui',
    title: 'Doctor en Psicología',
    location: 'UCM - España 🇪🇸'
  },
  {
    image: 'https://i.postimg.cc/SN5BN3DX/ken-singer.png',
    name: 'Conferencista: Ken Singer',
    title: 'Chief Learning Officer And MD',
    location: 'Berkeley CA - EE.UU. 🇺🇸'
  },
  {
    image: 'https://i.postimg.cc/YS10x1h3/gustavo-perez.png',
    name: 'Conferencista: Gustavo Pérez',
    title: 'MSc. en Telecomunicaciones y Telemática',
    location: 'Utepsa - Bolivia 🇧🇴'
  },
  {
    image: 'https://i.postimg.cc/9M769p0m/raul-eduardo-rodriguez.png',
    name: 'Conferencista: Raúl Eduardo Rodríguez',
    title: 'Doctor en Educación',
    location: 'Universidad Simón Bolívar - Colombia 🇨🇴'
  },
  {
    image: 'https://i.postimg.cc/mkdygx4t/diana-marcela-pantaleon.png',
    name: 'Conferencista: Diana Marcela Pantaleon',
    title: 'Doctora en Educación',
    location: 'Universidad Simón Bolívar - Colombia 🇨🇴'
  }
];

const Exhibitors = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {speakers.map((speaker, index) => (
          <SpeakerCard
            key={index}
            image={speaker.image}
            name={speaker.name}
            title={speaker.title}
            location={speaker.location}
          />
        ))}
      </ScrollView>
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
  },
});

export default Exhibitors;
