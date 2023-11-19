import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import TicketCard from '../components/Card/TicketCard';
import { getTickets } from '../controller/auth/tickets';
import AsyncStorage from '@react-native-async-storage/async-storage';
const MisTicketsScreen = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        const data = await getTickets(email);
        setTickets(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.Titulo}>Mis Reclamos</Text>
      {tickets.map((ticket, index) => (
        <TicketCard ticket={ticket} key={index} /> 
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

export default MisTicketsScreen;
