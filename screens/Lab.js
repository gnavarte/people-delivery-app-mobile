import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import io from 'socket.io-client';

const Lab = () => {

  const [mensaje, setMensaje] = useState('Esperando mensaje...');

  useEffect(() => {
    // Reemplaza 'http://tu-servidor-socket.io.com' con la dirección de tu servidor Socket.IO
    const socket = io('http://192.168.153.245:3000');

    socket.on('connect', () => {
      console.log('Conectado al servidor de Socket.IO');
    });

    // Escucha eventos o envía eventos al servidor
    socket.on('message', (data) => {
      console.log('Mensaje recibido:', data);
      setMensaje(data);
    });

    // Puedes enviar eventos al servidor de la siguiente manera
    socket.emit('miEvento', { mensaje: 'Hola, servidor de Socket.IO' });

    // Cuando el componente se desmonta, desconecta el socket
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Componente de Socket.IO</Text>
      <Text style={styles.message}>{mensaje}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 20
  },
  message: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 20
  }
});

export default Lab;
