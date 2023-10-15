import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

const TravelMap = ({ destination, onTravelComplete }) => {
  const [origin, setOrigin] = useState();
  const [route, setRoute] = useState([]);
  const [routeLoaded, setRouteLoaded] = useState(false);
  const [isDestinationMarkerVisible, setIsDestinationMarkerVisible] = useState(true);
  const [position, setPosition] = useState(0);
  const mapRef = useRef(null);
  const apiKey = process.env.EXPO_PUBLIC_OPENROUTESERVICE_API_KEY;

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setOrigin({ latitude, longitude });
      }
    } catch (error) {
      console.error('Error al obtener la ubicación del dispositivo:', error);
    }
  };

  const calculateRoute = () => {
    if (origin && destination) {
      axios
        .get(
          `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${origin.longitude},${origin.latitude}&end=${destination.longitude},${destination.latitude}`
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
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (destination) {
      calculateRoute();
    }
  }, [destination, origin]);

  useEffect(() => {
    if (routeLoaded) {
      if (position < route.length - 1) {
        const timer = setInterval(() => {
          setPosition((prevPosition) => prevPosition + 1);
          if (mapRef.current) {
            mapRef.current.animateToRegion({
              latitude: route[position].latitude,
              longitude: route[position].longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          }
        }, 1000);

        return () => {
          clearInterval(timer);
        };
      } else {
        setOrigin(destination);
        setIsDestinationMarkerVisible(false);
        setRoute([]);
        setRouteLoaded(false);
        onTravelComplete();
      }
    }
  }, [position, route, routeLoaded]);

  const carLocation = routeLoaded ? route[position] : origin;

  return (
    <View style={styles.container}>
      {origin && (
        <MapView
          ref={mapRef}
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
          {destination && isDestinationMarkerVisible && (<Marker coordinate={destination} title="Destino" />)}
          {routeLoaded && (
            <Polyline coordinates={route.slice(position)} strokeWidth={4} strokeColor="black" />
          )}
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
    height: '100%',
  },
  carInfoContainer: {
    alignItems: 'center',
  },
  carInfoText: {
    fontSize: 16,
  },
});

export default TravelMap;
