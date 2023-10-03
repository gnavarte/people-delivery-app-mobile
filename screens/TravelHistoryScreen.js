import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

import travelHistoryData from '../data/travel_history.json';
import { getViajes } from '../controller/auth/viajes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
const TravelScreen = () => {
  const [sortBy, setSortBy] = useState(null);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        const data = await getViajes(email);
        console.log(data)
        setSortedData(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const sortData = (key) => {
    let sortedDataCopy = [...sortedData];

    if (sortBy === key) {
      sortedDataCopy.reverse();
    } else {
      sortedDataCopy.sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      });
    }

    setSortedData(sortedDataCopy);
    setSortBy(key);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => sortData('Fecha')}>
          <View style={styles.filterButton}>
            <Icon name="calendar" size={20} color={sortBy === 'Fecha' ? 'blue' : 'black'} />
            <Text style={styles.filterButtonText}>Fecha</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sortData('Duracion')}>
          <View style={styles.filterButton}>
            <Icon name="clock-o" size={20} color={sortBy === 'Duracion' ? 'blue' : 'black'} />
            <Text style={styles.filterButtonText}>Duración</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sortData('Valoracion')}>
          <View style={styles.filterButton}>
            <Icon name="star" size={20} color={sortBy === 'Valoracion' ? 'blue' : 'black'} />
            <Text style={styles.filterButtonText}>Valoración</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sortData('Ganancia')}>
          <View style={styles.filterButton}>
            <Icon name="dollar" size={20} color={sortBy === 'Ganancia' ? 'blue' : 'black'} />
            <Text style={styles.filterButtonText}>Precio Total</Text>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={sortedData}
        keyExtractor={(item) => item.Fecha}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.column}>{item.updatedAt}</Text>
            <Text style={styles.column}>{item.createdAt} horas</Text>
            <Text style={styles.column}>{item.valoracion}</Text>
            <Text style={styles.column}>${item.totalPrice}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  column: {
    flex: 1,
    marginRight: 5,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  filterButtonText: {
    marginLeft: 5,
  },
});

export default TravelScreen;
