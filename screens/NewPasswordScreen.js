import React from 'react';
import { View, Image, Text, StyleSheet, Alert, TextInput ,Dimensions} from 'react-native';

import { PrimaryButton } from '../components/Buttons/Button';
import TextInputCustomized from '../components/TextInputs/TextInputCustomized';
import CustomInput from '../components/TextInputs/CustomInput';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const InputCodeScreen = () => {
  const [actualPassword , setActualPassword] = useState('');
  const [newPassword , setNewPassword] = useState('');
  const [repeatNewPassword , setRepeatNewPassword] = useState('');

  const navigateToRecoveryPassword = () => {
    if (newPassword!=repeatNewPassword){
      Alert.alert("Las nuevas contraseñas no coinciden")
    }
    else if (newPassword.length<5 || repeatNewPassword.length<5)
    {
      Alert.alert("Por favor ingrese una contraseña mayor a 5 caracteres")
    }
    else if (actualPassword && newPassword && repeatNewPassword != "")
    {
      Alert.alert("cambiamos contraseña")
    }
    else if (actualPassword || newPassword || repeatNewPassword == "")
    {
      Alert.alert("por favor complete todos los campos")
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>PD</Text>
      <View style={styles.topImageContainer}>
        <Image
          source={require('../assets/ChangePassword.png')}
          style={styles.topImage}
          resizeMode='contain'
        />
      </View>
        <Text style={styles.welcomeText}>Ingresa tu nueva contraseña</Text>
        <CustomInput placeholder="Ingresa tu contraseña actual" value={actualPassword} onChangeText={setActualPassword} secureTextEntry={true}  />
        <CustomInput placeholder="Ingresa tu nueva contraseña" value={newPassword} onChangeText={setNewPassword} secureTextEntry={true}  />
        <CustomInput placeholder="Repeti tu nueva contraseña" value={repeatNewPassword} onChangeText={setRepeatNewPassword} secureTextEntry={true}  />

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
    fontSize: Dimensions.get('window').width*0.04,
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

export default InputCodeScreen;
