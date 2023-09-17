import React from "react";
import { View, Text, StyleSheet, TextInput, Dimensions, Image, KeyboardAvoidingView,Alert } from "react-native";
import { useForm } from "../hooks/useForm";
import { PrimaryButton } from "../components/Buttons/Button";
import CustomInput from "../components/TextInputs/CustomInput";
import { useNavigation } from "@react-navigation/native";
const LoginScreen = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const { form, onChange } = useForm(initialState);
  const navigation = useNavigation();

  const navigateToForgotPassword = () => {
    navigation.push("ForgotPasswordScreen")
  }
  const validateEmail = (email) => {
    if (!email) {
      return "El correo electrónico no puede estar vacío.";
    }
  
    if (!email.includes("@")) {
      return "El correo electrónico debe contener un @.";
    }
  
    const [username, domain] = email.split("@");
  
    if (!username || !domain) {
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
  
  const redirectToHome = () =>{
    var booleanEmail=validateEmail(form.email)
    var booleanPassword=validatePassword(form.password)
    console.log(booleanEmail)
    console.log(booleanPassword)
    if (booleanEmail && booleanPassword === true)
    {
      //hago login y dsp redirigo
      navigation.push("HomeChofer")
    }
    else if (booleanEmail == true && booleanPassword != true){
      Alert.alert(booleanPassword)
    }
    else if (booleanEmail!= true && booleanPassword == true){
      Alert.alert(booleanEmail)
    }
    else if (booleanEmail && booleanPassword != true){
      Alert.alert("valide ambos campos por favor")
    }

  }
  
  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -200}
    >
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.helperText}>Ingrese correo electrónico y contraseña</Text>
          <Image source={require("../assets/LoginIcon.png")} style={styles.logo} />
        </View>
        <CustomInput placeholder="Correo electrónico" value={form.email} onChangeText={(value) => onChange(value, "email")} />
        <CustomInput placeholder="Contraseña" value={form.password} onChangeText={(value) => onChange(value, "password")} secureTextEntry={true}  />
        <PrimaryButton title="Iniciar sesión" onPress={redirectToHome} backgroundColor="#6372ff"/>
      </View>
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
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  topContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
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
