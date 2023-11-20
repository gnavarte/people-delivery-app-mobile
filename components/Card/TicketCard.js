import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions ,TouchableOpacity,Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import ModalDeleteCar from '../Modals/ModalDeleteCar';

const TicketCard = ({ ticket }) => {
  const [showModal, setShowModal] = useState(false);

return (
  <View style={styles.card}>
      <Image source={{
            uri: "https://cdn-icons-png.flaticon.com/512/5269/5269933.png",
          }}style={styles.imagen} />
      <View style={styles.info}>
        <Text style={styles.titulo}>Asunto: {ticket.asunto}</Text>
        <Text style={styles.textos}>{ticket.detalle}</Text>
        <Text style={styles.status}>status: {ticket.status}</Text>
        <Text style={styles.textos}>Fecha de solicitud: {new Date(Date.parse(ticket.timestampCreacion)).toISOString().split('T')[0]}</Text>
      </View>
  </View>
  );
};

const styles = StyleSheet.create({
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
    width: '20%', 
    height: '100%', 
    marginRight: 10,
    resizeMode: 'contain',
  },
  info: {
    flex: 1,
    justifyContent: 'center'
  },
  status:{
    ontSize: Dimensions.get('window').width*0.05,
    fontFamily: 'Roboto',
    color:'#7F44C2',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  textos: {
    fontSize: Dimensions.get('window').width*0.05,
    fontFamily: 'Roboto',
  },
  titulo: {
    fontSize: Dimensions.get('window').width*0.05,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#7F44C2',
    marginBottom: 10,
    textAlign: 'left'
  },

});

export default TicketCard;