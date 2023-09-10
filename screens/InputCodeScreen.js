import React, { useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, Alert, TextInput ,Dimensions} from 'react-native';

import { PrimaryButton } from '../components/Buttons/Button';
import TextInputCustomized from '../components/TextInputCustomized';

const InputCodeScreen = () => {
  const [inputValues, setInputValues] = useState(['', '', '', '', '']);
  const inputRefs = useRef([]);
  const navigateToRecoveryPassword = () => {
    console.log('Send code again');
  }
  const handleInputChange = (text, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = text;
    setInputValues(newInputValues);
  
    if (text === '') {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    } else if (text.length >= 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  
  const validateCode = async () => {
    const code = inputValues.join('');
    console.log(code)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PD</Text>
      <View style={styles.grayBackground}>
        <View style={styles.topImageContainer}>
          <Image
            source={require('../assets/InputCode.png')}
            style={styles.topImage}
            resizeMode='contain'
          />
        </View>
        <View style={styles.inputContainer}>
          {inputValues.map((value, index) => (
              <TextInput
                key={index}
                style={styles.input}
                maxLength={1}
                keyboardType='number-pad'
                value={value}
                onChangeText={(text) => handleInputChange(text, index)}
                onSubmitEditing={() => {
                  if (index < inputRefs.current.length - 1) {
                    inputRefs.current[index + 1].focus();
                  }
                }}
                ref={ref => inputRefs.current[index] = ref}
              />
            ))}   
        </View>   
        <Text style={styles.welcomeText}>Ingresa el codigo de 5 digitos enviado a tu correo electronico. </Text>
        <PrimaryButton title="No recibi el codigo!" onPress={navigateToRecoveryPassword} backgroundColor="#808080"  />        
      </View>
      <View style={styles.bottomCenterPage}>
          <PrimaryButton title="Continuar" onPress={validateCode} backgroundColor="#5985EB"  />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomCenterPage: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  grayBackground: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: Dimensions.get('window').width*0.05,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
    marginLeft: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  topImageContainer: {
    alignItems: 'center',
  },
  topImage: {
    height: Dimensions.get('window').height * 0.3, 
    width: Dimensions.get('window').width, 
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
    color: 'white',
  },
  welcomeText: {
    fontSize: Dimensions.get('window').width*0.04,
    marginBottom: 10,
    textAlign: 'center',
  },
  bottomLeftTextContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },

});

export default InputCodeScreen;
