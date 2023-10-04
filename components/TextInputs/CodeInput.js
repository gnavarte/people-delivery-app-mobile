import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const CodeInput = ({ onComplete }) => {
  const [inputValues, setInputValues] = useState(['', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleInputChange = (text, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = text;
    setInputValues(newInputValues);

    if (text === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (text.length >= 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Combinar los dígitos en una cadena completa
    const code = newInputValues.join('');
    onComplete(code);
  };

  return (
    <View style={styles.inputContainer}>
      {inputValues.map((value, index) => (
        <TextInput
          key={index}
          style={styles.input}
          maxLength={1}
          keyboardType='number-pad'
          value={value}
          onChangeText={(text) => handleInputChange(text, index)}
          ref={(ref) => (inputRefs.current[index] = ref)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: '#5985EB',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 24,
    marginHorizontal: 5,
    width: 50,
    height: 50,
    color: 'black',
  },
});

export default CodeInput;
