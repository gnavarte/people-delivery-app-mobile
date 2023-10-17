import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { getViajes } from '../controller/auth/viajes';

const EarningsScreen = () => {

  const [sortedData, setSortedData] = useState([]);
  const navigation = useNavigation();

  const navigateToTravelHistory = () => {
    navigation.navigate('Viajes');
  };

  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);

  const [totalPricesSum, setTotalPricesSum] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [averageDuration, setAverageDuration] = useState(0);

  const todayEarnings = calculateEarningsForDate(today, sortedData);
  const lastWeekEarnings = calculateEarningsForDateRange(lastWeek, today, sortedData);
  // const averageRating = calculateAverageRating(sortedData);
  const totalTravelTime = calculateTotalTravelTime(sortedData);

  function calculateEarningsForDate(date, data) {
    return data.reduce((totalEarnings, trip) => {
      if (new Date(trip.Fecha).toDateString() === date.toDateString()) {
        return totalEarnings + trip.Ganancia;
      }
      return totalEarnings;
    }, 0);
  }
  
  function calculateEarningsForDateRange(startDate, endDate, data) {
    return data.reduce((totalEarnings, trip) => {
      const tripDate = new Date(trip.Fecha);
      if (tripDate >= startDate && tripDate <= endDate) {
        return totalEarnings + trip.Ganancia;
      }
      return totalEarnings;
    }, 0);
  }
  
  function calculateAverageRating(data) {
    const totalRating = data.reduce((total, trip) => total + trip.Valoracion, 0);
    return (totalRating / data.length).toFixed(1);
  }
  
  function calculateTotalTravelTime(data) {
    const totalMinutes = data.reduce((total, trip) => total + trip.Duracion, 0);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        const data = await getViajes(email);
  
        const totalPricesSum = data.reduce((sum, item) => sum + item.totalPrice, 0);
  
        data.map((item) => {
          item.updatedAt = item.updatedAt.split('T')[0];
          item.duration_sec = Math.floor(item.duration_sec / 60);
        });
  
        setSortedData(data);
        setTotalPricesSum(totalPricesSum);
        const totalRating = data.reduce((total, trip) => total + trip.valoracion, 0);
        const averageRating = totalRating / data.length;
        if (isNaN(averageRating)) {
          setAverageRating(0);
        } else {
          setAverageRating(averageRating.toFixed(1));
        }

          // Calculate average duration
        const totalDurationSec = data.reduce((total, trip) => total + trip.duration_sec, 0);
        const averageDurationHours = totalDurationSec / data.length / 60;
        if (isNaN(averageDurationHours)) {
          setAverageDuration(0);
        } else {
          setAverageDuration(averageDurationHours.toFixed(1));
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchData();
  }, []);
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ganancias</Text>

      <View style={styles.statsContainer}>
        <Text style={styles.subtitle}>Hoy</Text>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>${totalPricesSum}</Text>
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
          <Text style={styles.additionalStatValue}>{averageDuration} Horas</Text>
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
    marginTop: 40,
    paddingHorizontal: 16,
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
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
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
