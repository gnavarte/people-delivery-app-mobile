import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import CodeInput from '../components/TextInputs/CodeInput';
import { PrimaryButton } from '../components/Buttons/Button';
import { useRoute } from '@react-navigation/native';
const InputCodeScreen = () => {
  const [code, setCode] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params.email;

  const handleCodeComplete = (value) => {
    setCode(value);
  };

  const validateCode = async () => {
    navigation.push('NewPasswordForgotScreen',{ email: email });
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
          backgroundColor="#7F44C2"
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
