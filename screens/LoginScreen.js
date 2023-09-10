import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useForm } from "../hooks/useForm";
import { PrimaryButton } from "../components/Buttons/Button";

const LoginScreen = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const { form, onChange } = useForm(initialState);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#aaaaaa"
        onChangeText={(value) => onChange(value, "email")}
        value={form.email}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        secureTextEntry
        placeholder="Contraseña"
        onChangeText={(value) => onChange(value, "password")}
        value={form.password}
        autoCapitalize="none"
      />
      <PrimaryButton title="Iniciar sesión" backgroundColor="#6372ff"/>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#ffffff",
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
});