import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import TravelMap from "../components/TravelMap";
import StartButton from "../components/Buttons/StartButton";
import TravelRequestModal from "../components/Modals/TravelRequestModal";
import axios from "axios";

const MainScreen = () => {
  const [isTravelRequestModalVisible, setIsTravelRequestModalVisible] = useState(false);
  const [isDriverVisible, setIsDriverVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Nuevo estado

  const passenger = { username: "John Doe", location: { latitude: -34.581389, longitude: -58.414167 }, destination: { latitude: -34.581389, longitude: -58.414167 } };
  const [destination, setDestination] = useState(null);
  const [destinationDetails, setDestinationDetails] = useState(null);

  const toggleDriverVisibility = () => {
    setIsDriverVisible((prevVisibility) => !prevVisibility);
  };

  const handleOnTravelComplete = () => {
    // Modal para cobrar
    console.log("Travel completed");
    setIsButtonDisabled(false); // Habilitar el botón
  };

  const openTravelRequestModal = () => {
    toggleDriverVisibility();
    setTimeout(() => {
      setIsTravelRequestModalVisible(true);
    }, 5000); // 5 segundos
  };

  const handleOnPress = () => {
    if (isDriverVisible) {
      setIsDriverVisible(false);
    } else {
      openTravelRequestModal();
    }
  };

  const handleOnAccept = () => {
    setDestination(passenger.destination);
    setIsTravelRequestModalVisible(false);
    setIsButtonDisabled(true); // Deshabilitar el botón
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
    if (passenger.destination) {
      getStreetAndLocality(passenger.destination.latitude, passenger.destination.longitude);
    }
  }, [passenger.destination]);

  return (
    <View style={styles.container}>
      <TravelMap destination={destination} onTravelComplete={handleOnTravelComplete} />
      <View style={styles.buttonContainer}>
        <StartButton
          title={isDriverVisible ? 'Detener' : 'Iniciar'}
          backgroundColor={isDriverVisible ? '#d66060' : '#6372ff'}
          onPress={handleOnPress}
          disabled={isButtonDisabled} // Pasar el estado como prop
        />
      </View>
      <TravelRequestModal
        isVisible={isTravelRequestModalVisible}
        username={passenger.username}
        location={destinationDetails}
        onAccept={handleOnAccept}
        onDeny={handleOnDeny}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    zIndex: 1,
  },
});

export default MainScreen;
