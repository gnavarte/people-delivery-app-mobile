import React from 'react';
import { View, Text, StyleSheet,Dimensions } from 'react-native';
import AutoCard from '../components/Card/AutoCard';

const MisAutosScreen = () => {
  const autos = [
    {
      nombre: 'Auto 1',
      año: 2020,
      model: 'Modelo A',
      viajes: 12,
      imagen: require('../assets/auto2.jpg')
    },
    {
      nombre: 'Auto 2',
      año: 2022,
      model: 'Modelo B',
      viajes: 8,
      imagen: require('../assets/auto2.jpg')
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.Titulo}>Mis autos</Text>
      {autos.map((auto, index) => (
        <AutoCard auto={auto} key={index} /> 
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center'
  },
  Titulo:{
    fontSize: Dimensions.get('window').width*0.07,
  }
});

export default MisAutosScreen;