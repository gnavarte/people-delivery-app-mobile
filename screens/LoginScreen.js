import React from "react";
import { View, Text, StyleSheet, TextInput, Dimensions, Image, KeyboardAvoidingView } from "react-native";
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
        <CustomInput placeholder="Contraseña" value={form.password} onChangeText={(value) => onChange(value, "password")} />
        <PrimaryButton title="Iniciar sesión" backgroundColor="#6372ff"/>
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
