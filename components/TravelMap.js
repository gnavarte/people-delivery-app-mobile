import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

const TravelMap = ({ destination }) => {
  const [origin, setOrigin] = useState();
  const [route, setRoute] = useState([]);
  const [routeLoaded, setRouteLoaded] = useState(false);
  const [position, setPosition] = useState(0);
  const mapRef = useRef(null); // Referencia al componente MapView
  const apiKey = process.env.EXPO_PUBLIC_OPENROUTESERVICE_API_KEY;

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = location.coords;
          setOrigin({ latitude, longitude });

          if (destination) {
            axios
              .get(
                `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${longitude},${latitude}&end=${destination.longitude},${destination.latitude}`
              )
              .then((response) => {
                const coordinates = response.data.features[0].geometry.coordinates;
                const newCoordinates = coordinates.map((coordinate) => ({
                  latitude: coordinate[1],
                  longitude: coordinate[0],
                }));
                setRoute(newCoordinates);
                setRouteLoaded(true);
              })
              .catch((error) => {
                console.error('Error al obtener la ruta:', error);
              });
          }
        }
      } catch (error) {
        console.error('Error al obtener la ubicación del dispositivo:', error);
      }
    };

    getCurrentLocation();
  }, [destination, apiKey]);

  useEffect(() => {
    if (routeLoaded) {
      if (position < route.length - 1) {
        const timer = setInterval(() => {
          setPosition((prevPosition) => prevPosition + 1);
          // Actualiza la región del mapa para seguir al automóvil
          if (mapRef.current) {
            mapRef.current.animateToRegion({
              latitude: route[position].latitude,
              longitude: route[position].longitude,
              latitudeDelta: 0.01, // Ajusta estos valores según tus necesidades
              longitudeDelta: 0.01,
            });
          }
        }, 1000);

        return () => {
          clearInterval(timer);
        };
      } else {
        Alert.alert('Destino alcanzado', 'Has llegado a tu destino.');
      }
    }
  }, [position, route, routeLoaded]);

  // Lógica para mostrar la ubicación del automóvil, basada en la posición en la ruta o la ubicación de origen
  const carLocation = routeLoaded ? route[position] : origin;

  return (
    <View style={styles.container}>
      {origin && (
        <MapView
          ref={mapRef} // Asigna la referencia al componente MapView
          style={styles.map}
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <Marker coordinate={carLocation}>
            <Ionicons name="car-sport" size={24} color="black" />
          </Marker>
          {destination && <Marker coordinate={destination} title="Destino" />}
          {routeLoaded && (
            <Polyline coordinates={route.slice(position)} strokeWidth={4} strokeColor="blue" />
          )}
        </MapView>
      )}
      {position < route.length - 1 && (
        <View style={styles.carInfoContainer}>
          <Text style={styles.carInfoText}>
            Coordenadas: {carLocation.latitude.toFixed(4)}, {carLocation.longitude.toFixed(4)}
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
