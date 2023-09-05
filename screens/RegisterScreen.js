import React from 'react';
import { View, Image, Text, StyleSheet, Alert, TextInput ,Dimensions} from 'react-native';

import { PrimaryButton } from '../components/Buttons/Button';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {

  const navigation = useNavigation();


  const navigateToRegister = () => {
    console.log('Register');
  }
  const navigateToForgotPassword =() => {
    navigation.push("ForgotPasswordScreen")
  }
  const navigateToLogin =() => {
    navigation.push("LoginScreen")
  }



  return (
    <View style={styles.container}>
      <Text style={styles.title}>PD</Text>
      <View style={styles.grayBackground}>
        <Text style={styles.welcomeText}>¡Bienvenido a People Delivery!</Text>
        
        

        <PrimaryButton title="Registrate" onPress={navigateToRegister} backgroundColor="#5985EB" />
        <ButtonWithIcon title="Continuar con Facebook" onPress={navigateToRegister} backgroundColor="#6372ff" icon={require('../assets/FacebookIcon.png')} />
        <ButtonWithIcon title="Continuar con Google" onPress={navigateToRegister} backgroundColor="#6372ff" icon={require('../assets/GoogleIcon.png')} />
        <PrimaryButton title="Iniciar session" onPress={navigateToLogin} backgroundColor="#5985EB" />

        <View style={styles.bottomLeftTextContainer}>
          <Text onPress={navigateToForgotPassword} style={styles.bottomLeftText}>Olvide mi contraseña</Text>
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
    fontSize: Dimensions.get('window').width*0.05,
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: Dimensions.get('window').width*0.05,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
    marginLeft: 20,
  },
  welcomeText: {
    fontSize: Dimensions.get('window').width*0.05,
    marginBottom: 10,
    textAlign: 'center',
  },
  bottomLeftTextContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  bottomLeftText: {
    fontSize: Dimensions.get('window').width*0.05,
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;