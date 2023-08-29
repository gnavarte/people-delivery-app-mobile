import React from 'react';
import { View, Image, Text, StyleSheet, Alert, TextInput, Dimensions } from 'react-native';

import { PrimaryButton } from '../components/Buttons/Button';
import TextInputCustomized from '../components/TextInputCustomized';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  const navigateToRecoveryPassword = () => {
    navigation.push("InputCodeScreen")
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>PD</Text>
      <View style={styles.grayBackground}>
        
        <Text style={styles.welcomeText}>Ingresa tu correo para recuperar la contraseña </Text>
        <TextInputCustomized placeholder="Ingresa tu Usuario" backgroundColor="#FFFFFF" placeholderTextColor="#000000" />
        <TextInputCustomized placeholder="Ingresa tu Contraseña" backgroundColor="#FFFFFF" placeholderTextColor="#000000" />        
      </View>
      <View style={styles.bottomCenterPage}>
          <PrimaryButton title="Recuperar contraseña" onPress={navigateToRecoveryPassword} backgroundColor="#000000"  />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomCenterPage: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  grayBackground: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: Dimensions.get('window').width*0.05,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
    marginLeft: 20,
  },
  welcomeText: {
    fontSize: Dimensions.get('window').width*0.04,
    marginBottom: 10,
    textAlign: 'center',
  },
  bottomLeftTextContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
});

export default LoginScreen;
