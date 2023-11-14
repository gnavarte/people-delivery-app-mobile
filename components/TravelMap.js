import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const TravelMap = ({ destination, onTravelComplete }) => {
  const [origin, setOrigin] = useState({ latitude: -34.5895, longitude: -58.3975 });
  const [route, setRoute] = useState([]);
  const [routeLoaded, setRouteLoaded] = useState(false);
  const [isDestinationMarkerVisible, setIsDestinationMarkerVisible] = useState(true);
  const [position, setPosition] = useState(0);
  const mapRef = useRef(null);
  const API_KEY = 'AvmPrvRS-voqmRn9ifwJ5pnVskBSZuc0zx4ztiQCxeHRCcr8zld_DxjJbW8U40tP'; // Reemplaza con tu clave API de Bing Maps

  const calculateRoute = () => {
    if (origin && destination) {
      console.log('Latitud de origen:', origin.latitude, 'Longitud de origen:', origin.longitude);
      console.log('Latitud de destino:', destination.latitude, 'Longitud de destino:', destination.longitude);
      const url = `http://dev.virtualearth.net/REST/V1/Routes/Truck?wp.0=${origin.latitude},${origin.longitude}&wp.1=${destination.latitude},${destination.longitude}&routeAttributes=routePath&key=${API_KEY}`;

      axios
        .get(url)
        .then((response) => {
          const routeLegs = response.data.resourceSets[0].resources[0].routePath.line.coordinates;
          const coordinates = [];
          
          routeLegs.forEach((coordinate) => {
            coordinates.push({ latitude: coordinate[0], longitude: coordinate[1] });
          });

          setRoute(coordinates);
          console.log('Ruta:', coordinates);
          console.log('Cantidad de puntos de ruta:', coordinates.length);
          setRouteLoaded(true);
        })
        .catch((error) => {
          console.error('Error al obtener la ruta:', error);
        });
    }
  };

  useEffect(() => {
    if (destination) {
      calculateRoute();
    }
  }, [destination]);

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
});

export default TravelMap;
