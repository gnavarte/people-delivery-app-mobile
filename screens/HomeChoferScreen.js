import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import BotonCircular from '../components/Buttons/ButtonCircle';
const HomeChoferScreen = () => {
  const handleIniciar = () => {
    console.log("iniciamos")
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Bienvenido a People Delivery</Text>
      <Image
        source={require('../assets/Mapa.jpg')} // Reemplaza con la ruta correcta de tu imagen de mapa
        style={{ width: '100%', height: 300, resizeMode: 'cover' }}
      />
      <TouchableOpacity
        style={{
          padding: 20,
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <BotonCircular backgroundColor="#7F44C2" onPress={handleIniciar} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeChoferScreen;
