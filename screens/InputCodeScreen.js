import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import CodeInput from '../components/TextInputs/CodeInput';
import { PrimaryButton } from '../components/Buttons/Button';
import { baseStyles } from '../themes/theme';
import { useRoute } from '@react-navigation/native';
import {  sendEmail } from "../controller/auth/email";
const InputCodeScreen = () => {
  const [code, setCode] = useState('');
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params.email;
  const handleCodeComplete = (value) => {
    setCode(value);
  };

  const validateCode = async () => {
    if (code.length === 5) {
      if ( code === route.params.code.toString()) { 
        navigation.push('NewPasswordForgotScreen',{ email: email });
      }
      else if (code !== route.params.code.toString()) {
        Alert.alert("El codigo es incorrecto")
      }
      
    }
  };

  const handleResendCode = () => {
    sendEmail(route.params.email, route.params.code);
    const disableTime = 30; 
    setResendButtonDisabledTime(disableTime);

    const interval = setInterval(() => {
      setResendButtonDisabledTime((prevTime) => {
        if (prevTime === 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); 
  };

  const resendButtonTitle = resendButtonDisabledTime
    ? `Reenviar código (${resendButtonDisabledTime}s)`
    : 'Reenviar código';

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Detective.png')} style={styles.illustration} />
      <Text style={styles.helperText}>
        Ingresa el código de 5 dígitos enviado a tu correo electrónico.
      </Text>
      <CodeInput onComplete={handleCodeComplete} />
      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="Continuar"
          onPress={validateCode}
          backgroundColor="#5985EB"
        />
        <PrimaryButton
          title={resendButtonTitle}
          onPress={handleResendCode}
          backgroundColor="#7F44C2"
          disabled={resendButtonDisabledTime > 0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: baseStyles.padding,
  },
  illustration: {
    width: Dimensions.get('window').width * 0.65,
    height: Dimensions.get('window').width * 0.65,
    marginBottom: 10,
  },
  helperText: {
    fontSize: Dimensions.get('window').width * 0.04,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default InputCodeScreen;