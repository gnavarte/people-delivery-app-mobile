import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import TravelMap from "../components/TravelMap";
import StartButton from "../components/Buttons/StartButton";
import TravelRequestModal from "../components/Modals/TravelRequestModal";

const touristAttractions = [
  { name: "Obelisco", latitude: -34.6037, longitude: -58.3816 },
  { name: "Casa Rosada", latitude: -34.6098, longitude: -58.3704 },
  { name: "Teatro Colón", latitude: -34.6017, longitude: -58.3836 },
  { name: "Recoleta Cemetery", latitude: -34.5885, longitude: -58.3974 },
  { name: "Puerto Madero", latitude: -34.6100, longitude: -58.3630 },
  { name: "La Bombonera", latitude: -34.6350, longitude: -58.3633 },
  { name: "Jardín Japonés", latitude: -34.5893, longitude: -58.3975 },
  { name: "Palermo Soho", latitude: -34.5909, longitude: -58.4298 },
  { name: "Tigre", latitude: -34.4262, longitude: -58.5796 },
  { name: "El Caminito", latitude: -34.6345, longitude: -58.3625 },
  { name: "Museo Nacional de Bellas Artes", latitude: -34.5895, longitude: -58.3942 },
  { name: "Planetario Galileo Galilei", latitude: -34.5713, longitude: -58.4232 },
  { name: "Malba - Museo de Arte Latinoamericano", latitude: -34.5779, longitude: -58.4175 },
];

const MainScreen = () => {
  const [isTravelRequestModalVisible, setIsTravelRequestModalVisible] = useState(false);
  const [isDriverVisible, setIsDriverVisible] = useState(false);
  const [isOpeningModal, setIsOpeningModal] = useState(false);

  const passenger = { username: "John Doe", location: { latitude: -34.6037, longitude: -58.3816 }, destination: { latitude: -34.6098, longitude: -58.3704 } };
  const [destination, setDestination] = useState(null);

  const toggleDriverVisibility = () => {
    setIsDriverVisible((prevVisibility) => !prevVisibility);
  };

  const handleOnTravelComplete = () => {
    console.log("Travel completed");
  };

  const openTravelRequestModal = () => {
    setIsOpeningModal(true);
    toggleDriverVisibility();
    setTimeout(() => {
      setIsTravelRequestModalVisible(true);
      setIsOpeningModal(false);
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
    setRandomDestination();
    setIsTravelRequestModalVisible(false);
  };

  const handleOnDeny = () => {
    setIsTravelRequestModalVisible(false);
  };

  const setRandomDestination = () => {
    const randomIndex = Math.floor(Math.random() * touristAttractions.length);
    const randomAttraction = touristAttractions[randomIndex];
    setDestination(randomAttraction);
  };

  return (
    <View style={styles.container}>
      <TravelMap destination={destination} onTravelComplete={handleOnTravelComplete} />
      <View style={styles.buttonContainer}>
        <StartButton
          title={isDriverVisible ? 'Detener' : 'Iniciar'}
          backgroundColor={isDriverVisible ? '#d66060' : '#6372ff'}
          onPress={handleOnPress}
        />
      </View>
      <TravelRequestModal
        isVisible={isTravelRequestModalVisible}
        username={passenger.username}
        location={passenger.location}
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
