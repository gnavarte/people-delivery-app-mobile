import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TextInput, Dimensions, Alert } from 'react-native';

import { PrimaryButton } from '../components/Buttons/Button';
import TextInputCustomized from '../components/TextInputs/TextInputCustomized';
import CustomInput from '../components/TextInputs/CustomInput';

const NewPasswordForgotScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigateToRecoveryPassword = () => {
    console.log('Nueva contraseña:', password);
    console.log('Confirmar contraseña:', confirmPassword);
    if (password !== confirmPassword) {
      Alert.alert("las contraseña no coinciden")
      return;
    }
    else if(password.length < 5 ||confirmPassword.length<5 )
    {
      Alert.alert("las contraseña debe tener al menos 5 caracteres")
      return;
    }
    else if(password===confirmPassword)
    {
      Alert.alert("las contraseña coinciden")
      return;
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image
          source={require('../assets/ChangePasswordLogo.png')}
          style={styles.topImage}
          resizeMode='contain'
        />
      </View>
      <Text style={styles.welcomeText}>Ingresa tu nueva contraseña</Text>
      <CustomInput
        placeholder="Ingresa tu nueva contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <CustomInput
        placeholder="Repeti tu nueva contraseña"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <View style={styles.bottomCenterPage}>
        <PrimaryButton
          title="Cambiar contraseña"
          onPress={navigateToRecoveryPassword}
          backgroundColor="#5985EB"
        />
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
  topImageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  topImage: {
    height: Dimensions.get('window').height * 0.3, 
    width: Dimensions.get('window').width, 
  },
  
  title: {
    fontSize: Dimensions.get('window').width*0.05,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
    marginLeft: 20,
  },
  welcomeText: {
    fontSize: Dimensions.get('window').width*0.06,
    marginBottom: 10,
    textAlign: 'center',
  },
  bottomLeftTextContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  input: {
    marginBottom: 10, 
  },

});

export default NewPasswordForgotScreen;
