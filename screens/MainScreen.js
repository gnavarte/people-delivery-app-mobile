import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import TravelMap from "../components/TravelMap";

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
  // Agrega más atracciones turísticas aquí
];

const MainScreen = () => {
  const [destination, setDestination] = useState(null);

  const setRandomDestination = () => {
    // Elige una atracción turística aleatoria
    const randomIndex = Math.floor(Math.random() * touristAttractions.length);
    const randomAttraction = touristAttractions[randomIndex];
    setDestination(randomAttraction);
  };

  const handleOnTravelComplete = () => {
    console.log("Travel completed");
  };

  return (
    <View style={styles.container}>
      <TravelMap destination={destination} onTravelComplete={handleOnTravelComplete} />
      {destination && (<Text style={{ textAlign: "center" }}>{destination.name}</Text>)}
      <Button title="Choose random destination" onPress={setRandomDestination} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainScreen;
