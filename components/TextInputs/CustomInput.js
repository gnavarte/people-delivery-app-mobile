import React from "react";
import { TextInput, StyleSheet } from "react-native";

const CustomInput = ({ placeholder, value, onChangeText }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="black"
      onChangeText={onChangeText}
      value={value}
      autoCapitalize="none"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#ffffff",
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    borderWidth: 1,
    borderColor: '#7F44C2'
  },  
});

export default CustomInput;
