import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

const TravelMap = () => {
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState({ latitude: -34.6085, longitude: -58.3705 });
  const [route, setRoute] = useState([]);
  const [routeLoaded, setRouteLoaded] = useState(false);
  const [position, setPosition] = useState(0);
  const apiKey = process.env.EXPO_PUBLIC_OPENROUTESERVICE_API_KEY;
  const carMarkerRef = useRef(null);

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

  useEffect(() => {
    if (routeLoaded) { // Comprueba si la ruta está cargada
      if (position < route.length - 1) {
        const timer = setInterval(() => {
          setPosition(prevPosition => prevPosition + 1);
        }, 1000);

        return () => {
          clearInterval(timer);
        };
      } else {
        Alert.alert('Destino alcanzado', 'Has llegado a tu destino.');
      }
    }
  }, [position, route, routeLoaded]);

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
          {position < route.length - 1 && (
            <Marker coordinate={route[position]}>
              <Ionicons name="car" size={24} color="blue" ref={carMarkerRef} />
            </Marker>
          )}
          <Marker coordinate={destination} title="Destino" />
          {routeLoaded && (
            <Polyline coordinates={route.slice(position)} strokeWidth={4} strokeColor="blue" />
          )}
        </MapView>
      )}
      {position < route.length - 1 && (
        <View style={styles.carInfoContainer}>
          <Text style={styles.carInfoText}>
            Coordenadas: {route[position].latitude.toFixed(4)}, {route[position].longitude.toFixed(4)}
          </Text>
        </View>
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
  carInfoContainer: {
    alignItems: 'center',
  },
  carInfoText: {
    fontSize: 16,
  },
});

export default TravelMap;
