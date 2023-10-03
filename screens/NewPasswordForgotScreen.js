import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image, KeyboardAvoidingView, Alert, Platform } from "react-native";
import { useForm } from "../hooks/useForm";
import { PrimaryButton } from "../components/Buttons/Button";
import CustomInput from "../components/TextInputs/CustomInput";
import { useNavigation } from "@react-navigation/native";
import { baseStyles } from "../themes/theme";
import { useRoute } from "@react-navigation/native";
import { forgotPassword } from "../controller/auth/auth";
const LoginScreen = () => {
  const initialState = {
    newPassword: "",
    confirmPassword: "",
  };
  const { form, onChange } = useForm(initialState);
  const navigation = useNavigation();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const route = useRoute();
  const email = route.params.email;

  useEffect(() => {
    // Función para validar el formulario y habilitar o deshabilitar el botón.
    const validateForm = () => {
      setIsButtonDisabled(!(form.newPassword && form.confirmPassword));
    };

    validateForm();
  }, [form]);

  const validatePasswordConfirmation = (newPassword, confirmPassword) => {
    if (newPassword !== confirmPassword) {
      return "Las contraseñas no coinciden.";
    }

    return true;
  };

  const redirectToHome = async () => {
    const resultadoValidacionPasswordConfirmation = validatePasswordConfirmation(form.newPassword, form.confirmPassword);
    if (resultadoValidacionPasswordConfirmation === true) {

      const response = await forgotPassword(email, form.newPassword);

      if (response==200)
      {
        Alert.alert("Tu contraseña fue actualizada correctamente")
        navigation.push("HomeChofer");
      }
    } else {
      Alert.alert("Por favor, valide ambos campos de contraseña correctamente.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -200}
    >
      <View style={styles.topContainer}>
        <Image style={styles.illustration} source={require("../assets/Padlock.png")} />
        <Text style={styles.helperText}>Ingrese su nueva contraseña</Text>
      </View>
      <CustomInput placeholder="Nueva Contraseña" value={form.newPassword} onChangeText={(value) => onChange(value, "newPassword")} secureTextEntry={true} />
      <CustomInput placeholder="Confirmar Contraseña" value={form.confirmPassword} onChangeText={(value) => onChange(value, "confirmPassword")} secureTextEntry={true} />
      <PrimaryButton title="Iniciar sesión" onPress={redirectToHome} backgroundColor="#6372ff" disabled={isButtonDisabled} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: baseStyles.padding,
  },
  topContainer: {
    alignItems: "center",
  },
  illustration: {
    width: Dimensions.get("window").width * 0.65,
    height: Dimensions.get("window").width * 0.65,
    marginBottom: 10,
  },
  helperText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 10,
  },
});