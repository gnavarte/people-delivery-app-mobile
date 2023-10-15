import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps'; // Importa Marker desde react-native-maps
import * as Location from 'expo-location';
import { Text } from 'react-native';

const MainScreen = () => {
  const [origin, setOrigin] = useState({ latitude: 0, longitude: 0 });
  const [locationAvailable, setLocationAvailable] = useState(false);

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = location.coords;
          setOrigin({ latitude, longitude });
          setLocationAvailable(true);
        }
      } catch (error) {
        console.error('Error al obtener la ubicación del dispositivo:', error);
      }
    };

    getCurrentLocation();

  }, []);

  return (
    <React.Fragment>
      {locationAvailable ? (
        <MapView 
          style={{ flex: 1 }}
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker // Agrega el marcador en la ubicación
            coordinate={{
              latitude: origin.latitude,
              longitude: origin.longitude,
            }}
            title="Mi ubicación" // Puedes personalizar el título
            description="Aquí estoy" // Puedes personalizar la descripción
          />
        </MapView>
      ) : (
        <Text>Loading... Esperando la ubicación del dispositivo</Text>
      )}
    </React.Fragment>
  );
};

export default MainScreen;
