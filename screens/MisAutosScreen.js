import React from 'react';
import { View, Text, Image, StyleSheet,Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

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
        <View key={index} style={styles.card}>
          <Image source={auto.imagen} style={styles.imagen} />
          <View style={styles.info}>
            <Text style={styles.textos}>{auto.nombre}</Text>
            <Text style={styles.textos}>{auto.año}</Text>
            <Text style={styles.textos}>{auto.model}</Text>
            <Text style={styles.textos}>Viajes: {auto.viajes}</Text>
            <AntDesign name="closecircle" size={24} color="black" />
          </View>
        </View>
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
    textos:{
        fontSize: Dimensions.get('window').width*0.06,
        fontFamily: 'Roboto',
    },
    Titulo:{
        fontSize: Dimensions.get('window').width*0.07,
    },
    card: {
      flexDirection: 'row',
      margin: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      width: '80%',
      height: '25%'
    },
    imagen: {
      width: '45%', 
      height: '100%', 
      marginRight: 10,
      resizeMode: 'contain',
    },
    info: {
      flex: 1,
      justifyContent: 'center'
    }
  });
export default MisAutosScreen;