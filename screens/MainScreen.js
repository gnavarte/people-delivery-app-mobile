import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import TravelMap from "../components/TravelMap";
import StartButton from "../components/Buttons/StartButton";
import TravelRequestModal from "../components/Modals/TravelRequestModal";
import TravelCompleteModal from "../components/Modals/TravelCompleteModal";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStatusChofer } from "../controller/auth/auth";

const MainScreen = () => {
  const [isTravelRequestModalVisible, setIsTravelRequestModalVisible] = useState(false);
  const [isTravelCompleteModalVisible, setIsTravelCompleteModalVisible] = useState(false);
  const [isDriverVisible, setIsDriverVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [driverStatus, setDriverStatus] = useState(null);

  const passenger = { username: "John Doe", location: { latitude: -34.581389, longitude: -58.414167 }, destination: { latitude: -34.581389, longitude: -58.414167 } };
  const [destination, setDestination] = useState(null);
  const [destinationDetails, setDestinationDetails] = useState(null);

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

  const openTravelRequestModal = () => {
    toggleDriverVisibility();
    setTimeout(() => {
      setIsTravelRequestModalVisible(true);
    }, 5000);
  };

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
            onPress: () => {
              setIsDriverVisible(false);
            },
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
            onPress: openTravelRequestModal,
          },
        ]
      );
    }
  };

  const handleOnAccept = () => {
    setDestination(passenger.destination);
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
        setDestinationDetails(details);
      }
    } catch (error) {
      console.error("Error al obtener información de geocodificación inversa:", error);
    }
  };

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
    if (passenger.destination) {
      getStreetAndLocality(passenger.destination.latitude, passenger.destination.longitude);
    }
  }, [passenger.destination]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a People Delivery</Text>
      <TravelMap destination={destination} onTravelComplete={handleOnTravelComplete} />
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
        username={passenger.username}
        location={destinationDetails}
        onAccept={handleOnAccept}
        onDeny={handleOnDeny}
      />
      <TravelCompleteModal
        isVisible={isTravelCompleteModalVisible}
        username={passenger.username}
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
    fontSize: 25,
  },
});

export default MainScreen;
