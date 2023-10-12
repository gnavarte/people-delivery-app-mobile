import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Dimensions } from 'react-native';

export const StartButton = ({ title, onPress, backgroundColor, disabled }) => {
  return (
    <TouchableOpacity onPress={disabled ? null : onPress} disabled={disabled}>
      <View style={[styles.button, { backgroundColor }, disabled && styles.disabledButton]}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 2,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: Dimensions.get('window').width * 0.05,
  },
  disabledButton: {
    backgroundColor: '#ccc', 
  },
});

export default StartButton;
