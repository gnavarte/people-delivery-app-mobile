import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const TextInputCustomizedLarge = ({ placeholder, value, onChangeText, backgroundColor, placeholderTextColor }) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChangeText}
        value={value}
        multiline={true} // Habilita el modo de varias líneas
        textAlignVertical="top" // Alinea el texto arriba
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    paddingHorizontal: 12,
    minHeight: 150,
  },
  input: {
    flex: 1,
    color: 'black',
    fontFamily: 'Roboto',
    textAlignVertical: 'top',
  },
});

export default TextInputCustomizedLarge;
