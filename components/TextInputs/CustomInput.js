import React from "react";
import { TextInput, StyleSheet } from "react-native";

const CustomInput = ({ placeholder, value, onChangeText, secureTextEntry, keyboardType }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={value ? "black" : "#aaaaaa"}
      onChangeText={onChangeText}
      value={value}
      autoCapitalize="none"
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType} // Aquí establecemos el tipo de teclado
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#ffffff",
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 10,
    paddingLeft: 16,
    borderWidth: 1,
    borderColor: '#7F44C2'
  },
});

export default CustomInput;
