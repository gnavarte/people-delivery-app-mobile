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
  const [isDestinationMarkerVisible, setIsDestinationMarkerVisible] = useState(true);
  const [isFirstLeg, setIsFirstLeg] = useState(true);

  const [origin, setOrigin] = useState({ latitude: -34.5895, longitude: -58.3975 });
  const [travel, setTravel] = useState(null);
  const [destination, setDestination] = useState(null);
  const [address, setAddress] = useState(null);
  const [route, setRoute] = useState([]);
  const [routeLoaded, setRouteLoaded] = useState(false);
  const [position, setPosition] = useState(0);
  const mapRef = useRef(null);
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
        if (isFirstLeg) {
          setIsFirstLeg(false);
          setRouteLoaded(false);
          setRoute([]);
          setPosition(0);
          setOrigin(destination);
          const [latitud, longitud] = travel.puntoLlegada.split(',');
          const secondLeg = { latitude: parseFloat(latitud), longitude: parseFloat(longitud) };
          setDestination(secondLeg);
          console.log('Primer tramo completado');
              // URL a la que se realizará la solicitud POST
          const url = 'https://core-integracion.azurewebsites.net/api/publish';
          // Cuerpo de la solicitud
          const date = new Date();
          const body = {
              "exchange": "ongoing_trips", 
              "message": {
                  "idViaje": travel.idViaje,
                  "idChofer": "gf123f12g",
                  "date": date.toISOString(),
                  "estadoViaje": "Iniciado"
              }
          };
          console.log('Cuerpo de la solicitud:', body);
          // Token de autorización
          const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDQyMjMxMTU0LCJjb2RlIjoiOG1Gc1FUVV4nSTdTZ3QtOHgpQjJzWHZJMnFxTHRUIn0.58jMwro7ZWc3hAH-uld5_kumOhzod3IUHHWewSqoA8U';
          // Configuración de la solicitud
          const config = {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              }
          };
          // Realizar la solicitud POST con Axios
          axios.post(url, body, config)
          .then(response => {
              // Manejar la respuesta exitosa
              console.log('Respuesta exitosa:', response.data);
          })
          .catch(error => {
              // Manejar el error
              console.error('Error al realizar la solicitud:', error);
          });
        }
        else {
          setOrigin(destination);
          setIsFirstLeg(true);
          setIsDestinationMarkerVisible(false);
          handleOnTravelComplete();
        }
      }
    }
  }, [position, route, routeLoaded]);

  const startSocketListening = () => {
    toggleDriverVisibility();
    socket.on('connect', () => {
      console.log('Conectado al servidor de Socket.IO');
    });
  
    socket.on('newTrip', async (data) => {
      console.log('Mensaje recibido:', data);
      setTravel(data);
      await getStreetAndLocality(data.puntoLlegada.split(',')[0], data.puntoPartida.split(',')[1])
        .then((address) => {
          setAddress(address);
        });
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
    const firstLeg = { latitude: parseFloat(latitud), longitude: parseFloat(longitud) };
    setDestination(firstLeg);
    setIsTravelRequestModalVisible(false);
    setIsButtonDisabled(true);
    // URL a la que se realizará la solicitud POST
    const url = 'https://core-integracion.azurewebsites.net/api/publish';
    // Cuerpo de la solicitud
    const date = new Date();
    const body = {
        "exchange": "accepted_trips", 
        "message": {
            "idViaje": travel.idViaje,
            "idChofer": "gf123f12g",
            "nombreChofer": "Lionel",
            "apellidoChofer": "Scaloni",
            "vehiculo": "La Scaloneta",
            "patente": "QA022TR",
            "date": date.toISOString(),
            "estadoViaje": "En camino"
        }
    };
    console.log('Cuerpo de la solicitud:', body);
    // Token de autorización
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDQyMjMxMTU0LCJjb2RlIjoiOG1Gc1FUVV4nSTdTZ3QtOHgpQjJzWHZJMnFxTHRUIn0.58jMwro7ZWc3hAH-uld5_kumOhzod3IUHHWewSqoA8U';
    // Configuración de la solicitud
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    // Realizar la solicitud POST con Axios
    axios.post(url, body, config)
        .then(response => {
            // Manejar la respuesta exitosa
            console.log('Respuesta exitosa:', response.data);
        })
        .catch(error => {
            // Manejar el error
            console.error('Error al realizar la solicitud:', error);
        });
  };

  const handleOnDeny = () => {
    setIsTravelRequestModalVisible(false);
  };

  const getStreetAndLocality = async (latitude, longitude) => {

    try {
      const response = await axios.get(`https://dev.virtualearth.net/REST/v1/Locations/${latitude},${longitude}?o=json&key=${API_KEY}`);

      const firstLocation = response.data.resourceSets[0].resources[0];
      if (firstLocation) {
        const address = firstLocation.address.formattedAddress;
        return address;
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
            {isFirstLeg ? (
              <Ionicons name="car-sport" size={24} color="black" />
            ) : (
              <Ionicons name="people" size={24} color="black" />
            )}
          </Marker>
          {destination && isDestinationMarkerVisible && (
            <Marker coordinate={destination} title="Destino" />
          )}
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
        username={travel ? travel.nombre + ' ' + travel.apellido : ''}
        location={travel ? address : ''}
        onAccept={handleOnAccept}
        onDeny={handleOnDeny}
      />
      <TravelCompleteModal
        isVisible={isTravelCompleteModalVisible}
        username={travel ? travel.nombre + ' ' + travel.apellido : ''}
        amountToPay={travel ? travel.precio : ''}
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
