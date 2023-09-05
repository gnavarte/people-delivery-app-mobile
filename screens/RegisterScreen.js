import React from 'react';
import { View, Text, Button, StyleSheet,Dimensions } from 'react-native';
import { PrimaryButton } from '../components/Buttons/Button';
<<<<<<< HEAD
import { ButtonWithIcon } from '../components/Buttons/ButtonWithIcon';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {

  const navigation = useNavigation();

  const navigateToRegister = () => {
    navigation.push("RegisterScreen")
  }
  const navigateToForgotPassword =() => {
    navigation.push("ForgotPasswordScreen")
  }
  const navigateToLogin =() => {
    navigation.push("HomeChofer")
  }



  return (
    <View style={styles.container}>
      <Text style={styles.title}>PD</Text>
      <View style={styles.grayBackground}>
        <Text style={styles.welcomeText}>¡Bienvenido a People Delivery!</Text>
        
        

        <PrimaryButton title="Registrate" onPress={navigateToRegister} backgroundColor="#6372ff" />
        <ButtonWithIcon title="Continuar con Facebook" onPress={navigateToRegister} backgroundColor="#6372ff" icon={require('../assets/FacebookIcon.png')} />
        <ButtonWithIcon title="Continuar con Google" onPress={navigateToRegister} backgroundColor="#6372ff" icon={require('../assets/GoogleIcon.png')} />
        <PrimaryButton title="Iniciar session" onPress={navigateToLogin} backgroundColor="#6372ff" />

        <View style={styles.bottomLeftTextContainer}>
          <Text onPress={navigateToForgotPassword} style={styles.bottomLeftText}>Olvide mi contraseña</Text>
=======
import TextInputBlack from '../components/TextInputCustomized';
export const InitialScreen = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Welcome to the app</Text>
        <Text style={styles.subtitle}>Please login or register</Text>
        <View style={styles.buttonsContainer}>
            <PrimaryButton title="Login" onPress={() => alert('Login')} />
            <PrimaryButton title="Register" onPress={() => alert('Register')} />
>>>>>>> e0799882ee7f223be1d37a15c25c732df2ddc3b8
        </View>
        <TextInputBlack placeholder="Email" />
        </View>
        
    );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
    fontSize: 24,
    fontWeight: 'bold',
    },
    subtitle: {
    fontSize: 18,
    },
    buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    },
});
export default InitialScreen;