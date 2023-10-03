import React, { useState, useEffect } from "react";
import { useForm } from "../hooks/useForm";
import { PrimaryButton } from "../components/Buttons/Button";
import CustomInput from "../components/TextInputs/CustomInput";
import { useNavigation } from "@react-navigation/native";
import { Alert, Image, KeyboardAvoidingView, StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import { baseStyles } from "../themes/theme";

const initialState = {
  email: "",
};

const ForgotPasswordScreen = () => {
  const { form, onChange } = useForm(initialState);
  const navigation = useNavigation();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const validateForm = () => {
      setIsButtonDisabled(!form.email);
    };

    validateForm();
  }, [form]);

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

  const redirectToHome = () => {
    const resultadoValidacionEmail = validateEmail(form.email);

    if (resultadoValidacionEmail === true) {
      navigation.push("InputCodeScreen", { email: form.email });
    } else {
      Alert.alert(resultadoValidacionEmail || "Valide ambos campos por favor");
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
        <Text style={styles.helperText}>Ingresa tu correo para recuperar la contraseña</Text>
      </View>
      <CustomInput placeholder="Correo electrónico" value={form.email} onChangeText={(value) => onChange(value, "email")} keyboardType="email-address" />
      <PrimaryButton title="Recuperar contraseña" onPress={redirectToHome} backgroundColor="#6372ff" disabled={isButtonDisabled} />
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;

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
    fontSize: Dimensions.get('window').width * 0.05,
    textDecorationLine: 'underline',
  },
});
