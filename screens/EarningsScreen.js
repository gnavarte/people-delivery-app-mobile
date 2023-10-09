import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import travelHistoryData from '../data/travel_history.json';

const EarningsScreen = () => {

  const navigation = useNavigation();

  const navigateToTravelHistory = () => {
    navigation.navigate('Viajes');
  };

  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);

  const todayEarnings = calculateEarningsForDate(today);
  const lastWeekEarnings = calculateEarningsForDateRange(lastWeek, today);
  const averageRating = calculateAverageRating();
  const totalTravelTime = calculateTotalTravelTime();

  function calculateEarningsForDate(date) {
    return travelHistoryData.reduce((totalEarnings, trip) => {
      if (new Date(trip.Fecha).toDateString() === date.toDateString()) {
        return totalEarnings + trip.Ganancia;
      }
      return totalEarnings;
    }, 0);
  }

  function calculateEarningsForDateRange(startDate, endDate) {
    return travelHistoryData.reduce((totalEarnings, trip) => {
      const tripDate = new Date(trip.Fecha);
      if (tripDate >= startDate && tripDate <= endDate) {
        return totalEarnings + trip.Ganancia;
      }
      return totalEarnings;
    }, 0);
  }

  function calculateAverageRating() {
    const totalRating = travelHistoryData.reduce((total, trip) => total + trip.Valoracion, 0);
    return (totalRating / travelHistoryData.length).toFixed(1);
  }

  function calculateTotalTravelTime() {
    const totalMinutes = travelHistoryData.reduce((total, trip) => total + trip.Duracion, 0);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ganancias</Text>

      <View style={styles.statsContainer}>
        <Text style={styles.subtitle}>Hoy</Text>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>${todayEarnings}</Text>
          <Text style={styles.statLabel}>Ingresos</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.subtitle}>Última Semana</Text>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>${lastWeekEarnings}</Text>
          <Text style={styles.statLabel}>Ingresos</Text>
        </View>
      </View>

      <View style={styles.additionalStatsContainer}>
        <View style={styles.additionalStatCard}>
          <Text style={styles.additionalStatValue}>{averageRating}</Text>
          <Text style={styles.additionalStatLabel}>Calificación Promedio</Text>
        </View>
        <View style={styles.additionalStatCard}>
          <Text style={styles.additionalStatValue}>{totalTravelTime}</Text>
          <Text style={styles.additionalStatLabel}>Tiempo Total de Viaje</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.detailButton}
        onPress={navigateToTravelHistory}
      >
        <Text style={styles.detailButtonText}>Ver Detalles</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statsContainer: {
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 16,
    color: 'gray',
  },
  additionalStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  additionalStatCard: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginRight: 16,
  },
  additionalStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  additionalStatLabel: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  detailButton: {
    backgroundColor: '#6372ff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EarningsScreen;
