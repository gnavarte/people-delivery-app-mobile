import React from 'react';
import { View, Image, Text, StyleSheet, Alert, TextInput ,Dimensions} from 'react-native';

import { PrimaryButton } from '../components/Buttons/Button';
import { ButtonWithIcon } from '../components/Buttons/ButtonWithIcon';
import { useNavigation } from '@react-navigation/native';

const InitialScreen = () => {

  const navigation = useNavigation();


  const navigateToRegister = () => {
    navigation.push("RegisterScreen")
  }
  const navigateToLogin =() => {
    navigation.push("LoginScreen")
  }
  const navigateToHomeChofer =() => {
    navigation.push("HomeChofer")
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>PD</Text>
      <View style={styles.grayBackground}>
        <Image source={require('../assets/InitialImage.png')} style={styles.logo} />
        <Text style={styles.welcomeText}>¡Bienvenido a People Delivery!</Text> 
        <PrimaryButton title="Registrate" onPress={navigateToRegister} backgroundColor="#6372ff" />
        <ButtonWithIcon title="Continuar con Facebook" onPress={navigateToHomeChofer} backgroundColor="#6372ff" icon={require('../assets/FacebookIcon.png')} />
        <ButtonWithIcon title="Continuar con Google" onPress={navigateToHomeChofer} backgroundColor="#6372ff" icon={require('../assets/GoogleIcon.png')} />
        <PrimaryButton title="Iniciar sesión" backgroundColor="#6372ff" onPress={navigateToLogin} />
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
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: Dimensions.get('window').width*0.05,
    marginBottom: 10,
    textAlign: 'center',
  },
  logo: {
    width: '100%',
    height: '40%',
    resizeMode: 'contain',
    marginBottom: 20, 
  },
});

export default InitialScreen;
