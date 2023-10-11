import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

const TravelMap = () => {
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState({ latitude: -34.6085, longitude: -58.3705 });
  const [route, setRoute] = useState([]);
  const [routeLoaded, setRouteLoaded] = useState(false);
  const apiKey = process.env.EXPO_PUBLIC_OPENROUTESERVICE_API_KEY;

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = location.coords;
          setOrigin({ latitude, longitude });

          axios
            .get(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${longitude},${latitude}&end=${destination.longitude},${destination.latitude}`)
            .then(response => {
              const coordinates = response.data.features[0].geometry.coordinates;
              const newCoordinates = coordinates.map(coordinate => ({
                latitude: coordinate[1],
                longitude: coordinate[0],
              }));
              setRoute(newCoordinates);
              setRouteLoaded(true);
            })
            .catch(error => {
              console.error('Error al obtener la ruta:', error);
            });
        }
      } catch (error) {
        console.error('Error al obtener la ubicación del dispositivo:', error);
      }
    };

    getCurrentLocation();
  }, [destination, apiKey]);

  return (
    <View style={styles.container}>
      {origin && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: (origin.latitude + destination.latitude) / 2,
            longitude: (origin.longitude + destination.longitude) / 2,
            latitudeDelta: Math.abs(origin.latitude - destination.latitude) + 0.1,
            longitudeDelta: Math.abs(origin.longitude - destination.longitude) + 0.1,
          }}
        >
          <Marker coordinate={origin} title="Origen">
            <Ionicons name="car" size={24} color="blue" />
          </Marker>
          <Marker coordinate={destination} title="Destino" />
          {routeLoaded && <Polyline coordinates={route} strokeWidth={4} strokeColor="blue" />}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '70%',
  },
});

export default TravelMap;
