import React from "react";
import { StyleSheet, View } from "react-native";
import TravelMap from "../components/TravelMap";

const MainScreen = () => {
  const destination = { latitude: -34.6085, longitude: -58.3705 };
  return (
    <View style={styles.container}>
      <TravelMap destination={destination} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainScreen;