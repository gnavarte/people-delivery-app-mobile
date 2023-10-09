import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Dimensions, Image, KeyboardAvoidingView, Alert } from "react-native";
import { baseStyles } from "../themes/theme";
import { useForm } from "../hooks/useForm";
import { PrimaryButton } from "../components/Buttons/Button";
import CustomInput from "../components/TextInputs/CustomInput";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../controller/auth/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';

const LoginScreen = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const { form, onChange } = useForm(initialState);
  const navigation = useNavigation();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const validateForm = () => {
      setIsButtonDisabled(!(form.email && form.password));
    };

    validateForm();
  }, [form]);

  const navigateToForgotPassword = () => {
    navigation.push("ForgotPasswordScreen");
  };

  const validateEmail = (email) => {
    if (!email) {
      return "El correo electrónico no puede estar vacío.";
    }
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailPattern.test(email)) {
      return "El correo electrónico no tiene un formato válido.";
    }

    const [nombreUsuario, dominio] = email.split("@");

    if (!nombreUsuario || !dominio) {
      return "El correo electrónico debe tener contenido antes y después del @.";
    }
    
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      return "La contraseña no puede estar vacía.";
    }

    if (password.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres.";
    }

    return true;
  };

  const redirectToHome = async () => {
    const resultadoValidacionEmail = validateEmail(form.email);
    const resultadoValidacionPassword = validatePassword(form.password);

    if (resultadoValidacionEmail === true && resultadoValidacionPassword === true) {
 
      const responseLogin=await loginUser(form.email, form.password);
      console.log(responseLogin)
      if (responseLogin !== "") {
        var email=form.email
        await AsyncStorage.setItem("email", email);
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
      else if (responseLogin === "") {
        Alert.alert("Usuario o contraseña incorrectos");
      }
    } else if (resultadoValidacionEmail === true && resultadoValidacionPassword !== true) {
      Alert.alert(resultadoValidacionPassword);
    } else if (resultadoValidacionEmail !== true && resultadoValidacionPassword === true) {
      Alert.alert(resultadoValidacionEmail);
    } else if (resultadoValidacionEmail !== true && resultadoValidacionPassword !== true) {
      Alert.alert("Valide ambos campos por favor");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -200}
    >
      <View style={styles.topContainer}>
        <Image style={styles.illustration} source={require("../assets/Receptionist.png")} />
        <Text style={styles.helperText}>Ingrese correo electrónico y contraseña</Text>
      </View>
      <CustomInput placeholder="Correo electrónico" value={form.email} onChangeText={(value) => onChange(value, "email")} keyboardType="email-address" />
      <CustomInput placeholder="Contraseña" value={form.password} onChangeText={(value) => onChange(value, "password")} secureTextEntry={true} />
      <PrimaryButton title="Iniciar sesión" onPress={redirectToHome} backgroundColor="#6372ff" disabled={isButtonDisabled} />
      <View style={styles.bottomLeftTextContainer}>
        <Text onPress={navigateToForgotPassword} style={styles.bottomLeftText}>Olvidé mi contraseña</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: baseStyles.padding,
    justifyContent: "center",
  },
  topContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  illustration: {
    width: Dimensions.get('window').width * 0.65,
    height: Dimensions.get('window').width * 0.65,
    marginBottom: 10,
  },
  helperText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
  bottomLeftTextContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  bottomLeftText: {
    fontSize: Dimensions.get('window').width*0.05,
    textDecorationLine: 'underline',
  },
});
