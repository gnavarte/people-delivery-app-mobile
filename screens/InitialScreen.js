import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import { PrimaryButton } from '../components/Buttons/Button';
import { ButtonWithIcon } from '../components/Buttons/ButtonWithIcon';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

const InitialScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    getLocationPermission();
  }, []);

  const navigateToRegister = () => {
    navigation.push('RegisterScreen');
  };

  const navigateToLogin = () => {
    navigation.push('LoginScreen');
  };

  const navigateToHomeChofer = () => {
    navigation.push('HomeChofer');
  };

  const getLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permiso de ubicación',
        'No se otorgó permiso para acceder a la ubicación.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      console.log('Ubicación actual:', { latitude, longitude });
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PD</Text>
      <View style={styles.grayBackground}>
        <Image
          style={styles.logo}
          source={require('../assets/Driver.png')}
        />
        <Text style={styles.welcomeText}>¡Bienvenido a People Delivery!</Text>
        <PrimaryButton
          title="Registrate"
          onPress={navigateToRegister}
          backgroundColor="#6372ff"
        />
        <ButtonWithIcon
          title="Continuar con Facebook"
          onPress={navigateToHomeChofer}
          backgroundColor="#6372ff"
          icon={require('../assets/FacebookIcon.png')}
        />
        <ButtonWithIcon
          title="Continuar con Google"
          onPress={navigateToHomeChofer}
          backgroundColor="#6372ff"
          icon={require('../assets/GoogleIcon.png')}
        />
        <PrimaryButton
          title="Iniciar sesión"
          backgroundColor="#6372ff"
          onPress={navigateToLogin}
        />
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
  text: {
    fontSize: Dimensions.get('window').width * 0.05,
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: Dimensions.get('window').width * 0.05,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
    marginLeft: 20,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: Dimensions.get('window').width * 0.05,
    marginBottom: 10,
    textAlign: 'center',
  },
  logo: {
    width: Dimensions.get('window').width * 0.65,
    height: Dimensions.get('window').width * 0.65,
    marginBottom: 10,
  },
});

export default InitialScreen;
