import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useForm } from "../hooks/useForm";
import { PrimaryButton } from "../components/Buttons/Button";

const RegisterScreen = () => {
  const initialState = {
    nombre: "",
    apellido: "",
    DNI: "",
    fechaNacimiento: "",
    domicilio: "",
    email: "",
    password: "",
  };
  const { form, onChange } = useForm(initialState);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#aaaaaa"
        onChangeText={(value) => onChange(value, "nombre")}
        value={form.nombre}
        autoCapitalize="true"
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        placeholderTextColor="#aaaaaa"
        onChangeText={(value) => onChange(value, "apellido")}
        value={form.apellido}
        autoCapitalize="true"
      />
      <TextInput
        style={styles.input}
        placeholder="Número de DNI"
        placeholderTextColor="#aaaaaa"
        onChangeText={(value) => onChange(value, "DNI")}
        value={form.DNI}
        autoCapitalize="false"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha de nacimiento"
        placeholderTextColor="#aaaaaa"
        onChangeText={(value) => onChange(value, "fechaNacimiento")}
        value={form.fechaNacimiento}
        autoCapitalize="false"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Domicilio"
        placeholderTextColor="#aaaaaa"
        onChangeText={(value) => onChange(value, "domicilio")}
        value={form.domicilio}
        autoCapitalize="true"
      />
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
      <PrimaryButton title="Registrarse" backgroundColor="#6372ff"/>
    </View>
  );
};

export default RegisterScreen;

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
