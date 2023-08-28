import React from 'react';
import { View, Image, Text, StyleSheet, Alert, TextInput } from 'react-native';

import { PrimaryButton } from '../components/Buttons/Button';

const ForgotPasswordScreen = () => {

  const navigateToRegister = () => {
    console.log('Register');
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>PD</Text>
      <View style={styles.grayBackground}>
        <Text style={styles.welcomeText}>¡Bienvenido a People Delivery!</Text>
        
        

        <PrimaryButton title="Continuar" onPress={navigateToRegister} backgroundColor="#5985EB" />
        <PrimaryButton title="Continuar con Apple" onPress={navigateToRegister} backgroundColor="#808080" />
        <PrimaryButton title="Continuar con Google" onPress={navigateToRegister} backgroundColor="#808080" />
        <PrimaryButton title="Iniciar session" onPress={navigateToRegister} backgroundColor="#5985EB" />

        <View style={styles.bottomLeftTextContainer}>
          <Text style={styles.bottomLeftText}>Olvide mi contraseña</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grayBackground: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  mapImage: {
    width: '100%',
    height: '40%',
    resizeMode: 'contain',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
    marginLeft: 20,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  bottomLeftTextContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  bottomLeftText: {
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});

export default ForgotPasswordScreen;
