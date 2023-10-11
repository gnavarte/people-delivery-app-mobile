import React from "react";
import { StyleSheet, View } from "react-native";
import TravelMap from "../components/TravelMap";

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <TravelMap />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainScreen;