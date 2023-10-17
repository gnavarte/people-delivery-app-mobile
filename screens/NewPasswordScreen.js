import React from 'react';
import { View, Image, Text, StyleSheet, Alert, TextInput ,Dimensions} from 'react-native';

import { PrimaryButton } from '../components/Buttons/Button';
import TextInputCustomized from '../components/TextInputs/TextInputCustomized';
import CustomInput from '../components/TextInputs/CustomInput';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { updatePassword } from '../controller/auth/auth';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const InputCodeScreen = () => {
  const [actualPassword , setActualPassword] = useState('');
  const [newPassword , setNewPassword] = useState('');
  const [repeatNewPassword , setRepeatNewPassword] = useState('');
  const route = useRoute();
  const email = route.params.email;
  const navigation = useNavigation();

  const navigateToRecoveryPassword = async () => {
    if (newPassword!=repeatNewPassword){
      Alert.alert("Las nuevas contraseñas no coinciden")
    }
    else if (newPassword.length<5 || repeatNewPassword.length<5)
    {
      Alert.alert("Las contraseñas deben tener al menos 5 caracteres")
    }
    else if (actualPassword && newPassword && repeatNewPassword != "")
    {
      const response =await updatePassword(email,actualPassword,newPassword);
      if (response===200)
      {
        Alert.alert("Tu contraseña fue actualizada correctamente")
        const latitude = await AsyncStorage.getItem('latitude');
        const longitude = await AsyncStorage.getItem('longitude');

        navigation.navigate('HomeChofer', {
          latitude: latitude,
          longitude: longitude,
        });
      }
      else
      {
        Alert.alert("La contraseña ingresada no es correcta")
      }
    }
  }


  return (
    <View style={styles.container}>
        <Image style={styles.illustration} source={require("../assets/Padlock.png")} />
        <Text style={styles.helperText}>Ingrese su nueva contraseña</Text>
        <CustomInput placeholder="Ingresa tu contraseña actual" value={actualPassword} onChangeText={setActualPassword} secureTextEntry={true}  />
        <CustomInput placeholder="Ingresa tu nueva contraseña" value={newPassword} onChangeText={setNewPassword} secureTextEntry={true}  />
        <CustomInput placeholder="Repeti tu nueva contraseña" value={repeatNewPassword} onChangeText={setRepeatNewPassword} secureTextEntry={true}  />
        <PrimaryButton
          title="Cambiar contraseña"
          onPress={navigateToRecoveryPassword}
          backgroundColor="#5985EB"
        />
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 40,
    justifyContent: "center",
  },
  illustration: {
    width: Dimensions.get("window").width * 0.65,
    height: Dimensions.get("window").width * 0.65,
    marginBottom: 10,
    alignSelf: "center",
  },
  helperText: {
    fontSize: Dimensions.get("window").width * 0.04,
    marginBottom: 10,
    alignSelf: "center",
  },
});

export default InputCodeScreen;
