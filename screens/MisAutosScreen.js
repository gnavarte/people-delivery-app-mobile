import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import AutoCard from '../components/Card/AutoCard';
import { getAutos } from '../controller/auth/autos';
import AsyncStorage from '@react-native-async-storage/async-storage';
const MisAutosScreen = () => {
  const [autos, setAutos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        const data = await getAutos(email);
        setAutos(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

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
