import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BotonCircular from '../components/Buttons/ButtonCircle';

const HomeChoferScreen = () => {
  const latitude = -34.6118; 
  const longitude = -58.4173; 

  const handleIniciar = () => {
    console.log("iniciamos");
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 25, textAlign: 'center' }}>Bienvenido a People Delivery</Text>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: latitude, longitude: longitude }}
            title={'Marker Title'}
            description={'Marker Description'}
          />
        </MapView>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <BotonCircular backgroundColor="#7F44C2" onPress={handleIniciar} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    padding: 20,
    borderRadius: 10,
  },
});

export default HomeChoferScreen;
