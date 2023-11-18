import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStatusChofer } from "../controller/auth/auth";
import io from 'socket.io-client';
import StartButton from "../components/Buttons/StartButton";
import TravelRequestModal from "../components/Modals/TravelRequestModal";
import TravelCompleteModal from "../components/Modals/TravelCompleteModal";

const MainScreen = () => {
  const socket = io('http://54.208.78.25:3000');
  const API_KEY = 'AvmPrvRS-voqmRn9ifwJ5pnVskBSZuc0zx4ztiQCxeHRCcr8zld_DxjJbW8U40tP';

  const [driverStatus, setDriverStatus] = useState(null);
  const [isTravelRequestModalVisible, setIsTravelRequestModalVisible] = useState(false);
  const [isTravelCompleteModalVisible, setIsTravelCompleteModalVisible] = useState(false);
  const [isDriverVisible, setIsDriverVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  
  const [travel, setTravel] = useState(null);
  const [destination, setDestination] = useState(null);
  const [adress, setAdress] = useState(null);
  
  const [route, setRoute] = useState([]);
  const [routeLoaded, setRouteLoaded] = useState(false);
  const [isDestinationMarkerVisible, setIsDestinationMarkerVisible] = useState(true);
  const [position, setPosition] = useState(0);
  const mapRef = useRef(null);
  
  const [origin, setOrigin] = useState({ latitude: -34.5895, longitude: -58.3975 });
  const passenger = { username: "John Doe", location: { latitude: -34.581389, longitude: -58.414167 }, destination: { latitude: -34.581389, longitude: -58.414167 } };
  const carLocation = routeLoaded ? route[position] : origin;


  useEffect(() => {
    const getDriverStatus = async () => {
      try {
        const email = await AsyncStorage.getItem("email");
        console.log("email", email);
        const driverUser = await getStatusChofer(email);
        const status = driverUser.status;
        setDriverStatus(status);
        console.log("status", status);
        const fullName = driverUser.firstName + " " + driverUser.lastName;
        await AsyncStorage.setItem("name", fullName);
        const imageProfile = driverUser.picturePath;
        await AsyncStorage.setItem("imageProfile", imageProfile);
      }
      catch (error) {
        console.log("Error:", error);
      }
    };
    getDriverStatus();
  }, []);

/*   useEffect(() => {
    if (passenger.destination) {
      getStreetAndLocality(passenger.destination.latitude, passenger.destination.longitude);
    }
  }, [passenger.destination]); */

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
        handleOnTravelComplete();
      }
    }
  }, [position, route, routeLoaded]);

  const startSocketListening = () => {
    toggleDriverVisibility();
    socket.on('connect', () => {
      console.log('Conectado al servidor de Socket.IO');
    });
  
    socket.on('newTrip', (data) => {
      console.log('Mensaje recibido:', data);
      setTravel(data);
      openTravelRequestModal();
    });
  
    return () => {
      socket.disconnect();
    };
  };

  const stopSocketListening = () => {
    toggleDriverVisibility();
    socket.disconnect();
  };

  const openTravelRequestModal = () => {
    setIsTravelRequestModalVisible(true);
  };

  const toggleDriverVisibility = () => {
    setIsDriverVisible((prevVisibility) => !prevVisibility);
  };

  const handleOnTravelComplete = () => {
    console.log("Travel completed");
    setTimeout(() => {
      setIsTravelCompleteModalVisible(true);
      setIsButtonDisabled(false);
    }, 2000);
  };

  const handleOnTravelCompleteModalClose = () => {
    setIsTravelCompleteModalVisible(false);
  }

  const handleOnPress = () => {
    if (isDriverVisible) {
      Alert.alert(
        "Confirmar Detener",
        "¿Estás seguro de que deseas dejar de recibir viajes?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Detener",
            onPress: stopSocketListening,
          },
        ]
      );
    } else {
      Alert.alert(
        "Confirmar Iniciar",
        "¿Estás seguro de que deseas empezar a recibir viajes?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Iniciar",
            onPress: startSocketListening,
          },
        ]
      );
    }
  };

  const handleOnAccept = () => {
    const [latitud, longitud] = travel.puntoPartida.split(',');
    const destino = { latitude: parseFloat(latitud), longitude: parseFloat(longitud) };
    setDestination(destino);
    setIsTravelRequestModalVisible(false);
    setIsButtonDisabled(true);
  };

  const handleOnDeny = () => {
    setIsTravelRequestModalVisible(false);
  };

  const getStreetAndLocality = async (latitude, longitude) => {
    const apiKey = process.env.EXPO_PUBLIC_OPENROUTESERVICE_API_KEY;

    try {
      const response = await axios.get('https://api.openrouteservice.org/geocode/reverse?api_key=' + apiKey + '&point.lon=' + longitude + '&point.lat=' + latitude);

      const firstFeature = response.data.features[0];
      if (firstFeature) {
        const details = firstFeature.properties.label;
        setAdress(details);
      }
    } catch (error) {
      console.error("Error al obtener información de geocodificación inversa:", error);
    }
  };



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




  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a Driver People Delivery!</Text>
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
      {driverStatus === false ? (
        <TouchableOpacity style={styles.button} onPress={navigateLoadData}>
          <Text>Por favor, carga los datos faltantes para empezar a usar la aplicación</Text>
        </TouchableOpacity>
      ) : (
        <StartButton
          title={isDriverVisible ? 'Detener' : 'Iniciar'}
          backgroundColor={isDriverVisible ? '#d66060' : '#6372ff'}
          onPress={handleOnPress}
          disabled={isButtonDisabled}
        />
      )}
      <TravelRequestModal
        isVisible={isTravelRequestModalVisible}
        username={travel ? travel.Nombre + ' ' + travel.Apellido : ''}
        location={travel ? travel.puntoPartida : ''}
        onAccept={handleOnAccept}
        onDeny={handleOnDeny}
      />
      <TravelCompleteModal
        isVisible={isTravelCompleteModalVisible}
        username={travel ? travel.Nombre + ' ' + travel.Apellido : ''}
        amountToPay={100}
        onAccept={handleOnTravelCompleteModalClose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
  },
  map: {
    flex: 1,
  },
});

export default MainScreen;
