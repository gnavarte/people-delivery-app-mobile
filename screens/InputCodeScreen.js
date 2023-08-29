import React from 'react';
import { View, Image, Text, StyleSheet, Alert, TextInput ,Dimensions} from 'react-native';

import { PrimaryButton } from '../components/Buttons/Button';
import TextInputCustomized from '../components/TextInputCustomized';

const InputCodeScreen = () => {

  const navigateToRecoveryPassword = () => {
    console.log('Register');
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>PD</Text>
      <View style={styles.grayBackground}>
        
        <Text style={styles.welcomeText}>Ingresa el codigo de 4 digitos enviado a tu correo electronico. </Text>
        <TextInputCustomized placeholder="Ingresa el codigo" backgroundColor="#FFFFFF" placeholderTextColor="#000000" />
        <PrimaryButton title="No recibi el codigo!" onPress={navigateToRecoveryPassword} backgroundColor="#808080"  />        
      </View>
      <View style={styles.bottomCenterPage}>
          <PrimaryButton title="Continuar" onPress={navigateToRecoveryPassword} backgroundColor="#000000"  />
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

export default InputCodeScreen;
