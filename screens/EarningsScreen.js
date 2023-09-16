import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import travelHistoryData from '../data/travel_history.json';

const windowWidth = Dimensions.get('window').width;

const groupByMonth = travelHistoryData.reduce((acc, item) => {
  const date = new Date(item.Fecha);
  const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
  if (acc[monthYear]) {
    acc[monthYear] += item.Ganancia;
  } else {
    acc[monthYear] = item.Ganancia;
  }
  return acc;
}, {});

const months = Object.keys(groupByMonth);
const gananciasPorMes = months.map((month) => groupByMonth[month]);
const labels = months.map((month) => month);

const dataForChart = {
  labels: labels,
  datasets: [
    {
      data: gananciasPorMes,
    },
  ],
};

const totalGanancias = gananciasPorMes.reduce((total, ganancia) => total + ganancia, 0);

const EarningsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <BarChart
          data={dataForChart}
          width={windowWidth}
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 2,
            color: (opacity = 1) => `#6372ff`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <Text style={styles.totalText}>
          Total de Ganancias: ${totalGanancias.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContent: {
    alignItems: 'center',
  },
  totalText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 16,
  },
});

export default EarningsScreen;
