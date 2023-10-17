import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PrimaryButton } from '../components/Buttons/Button';
import { ButtonWithIcon } from '../components/Buttons/ButtonWithIcon';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { signInWithCredential, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

const InitialScreen = () => {

  const navigation = useNavigation();

  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setIsLogged(false);
      setUserData(null);
    }).catch((error) => {
      console.log(error);
    });
  }

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '716124601907-fm1bob9s7bfrhnml15l42r98vjbtonb4.apps.googleusercontent.com',
  });
    
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserData(user);
          setIsLogged(true);
        }
      });
    }
  }, [response]);

  const navigateToRegister = () => {
    navigation.push('RegisterScreen');
  };

  const navigateToHomeChofer = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso de ubicación', 'No se otorgó permiso para acceder a la ubicación.', [{ text: 'OK' }]);
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    console.log('Ubicación actual:', location.coords);
    var latitude = location.coords.latitude;
    var longitude = location.coords.longitude;

    navigation.navigate('HomeChofer', {
      latitude: latitude,
      longitude: longitude,
    });
  }

  const navigateToLogin = () => {
    navigation.push('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.grayBackground}>
        <Text style={styles.welcomeText}>¡Bienvenido a People Delivery!</Text>
        <Image
          style={styles.logo}
          source={require('../assets/Driver.png')}
        />
        <PrimaryButton
          title="Registrate"
          onPress={navigateToRegister}
          backgroundColor="#6372ff"
        />
        {/* <ButtonWithIcon
          title="Continuar con Google"
          backgroundColor="#6372ff"
          icon={require('../assets/GoogleIcon.png')}
          onPress={() => promptAsync()}
        /> */}
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
