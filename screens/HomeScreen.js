import React from 'react';
import { View, Image, Text, StyleSheet, Alert  ,Dimensions} from 'react-native';

import { PrimaryButton } from '../components/Buttons/Button';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  
  const navigateToRegister = () => {
    navigation.push('RegisterScreen')
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>PD</Text>
      <View style={styles.grayBackground}>
        <Image
          source={require('../assets/Logo_Inicio.png')}
          style={styles.mapImage}
        />
        <Text style={styles.welcomeText}>Bienvenido a People Delivery</Text>
        <PrimaryButton title="Continuar" onPress={navigateToRegister} backgroundColor="#5985EB" />
        <View style={styles.bottomLeftTextContainer}>
          <Text style={styles.bottomLeftText}>o pedi un viaje en AppPD</Text>
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
  },
});

export default HomeScreen;
