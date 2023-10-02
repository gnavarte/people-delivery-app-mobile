import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import CodeInput from '../components/TextInputs/CodeInput';
import { PrimaryButton } from '../components/Buttons/Button';

const InputCodeScreen = () => {
  const [code, setCode] = useState('');
  const navigation = useNavigation();

  const handleCodeComplete = (value) => {
    setCode(value);
  };

  const validateCode = async () => {
    // Ahora, 'code' contiene el valor completo de 5 dígitos ingresados.
    navigation.push('NewPasswordForgotScreen');
  };

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
          title="Reenviar código"
          onPress={validateCode}
          backgroundColor="#6372ff"
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
    padding: 20,
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
