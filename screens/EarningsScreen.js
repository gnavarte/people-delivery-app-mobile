import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import travelHistoryData from '../data/travel_history.json';

const EarningsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.column}>Fecha</Text>
        <Text style={styles.column}>Duración</Text>
        <Text style={styles.column}>Valoración</Text>
        <Text style={styles.column}>Ganancia</Text>
      </View>
      <FlatList
        data={travelHistoryData}
        keyExtractor={(item) => item.Fecha}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.column}>{item.Fecha}</Text>
            <Text style={styles.column}>{item.Duracion} horas</Text>
            <Text style={styles.column}>{item.Valoracion}</Text>
            <Text style={styles.column}>${item.Ganancia}</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
});

export default EarningsScreen;
