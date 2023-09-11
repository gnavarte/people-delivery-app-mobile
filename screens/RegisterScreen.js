import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { useForm } from "../hooks/useForm";
import { PrimaryButton } from "../components/Buttons/Button";
import DateTimePicker from '@react-native-community/datetimepicker';

const RegisterScreen = () => {
  const initialState = {
    nombre: "",
    apellido: "",
    DNI: "",
    fechaNacimiento: new Date(),
    domicilio: "",
    email: "",
    password: "",
  };
  const { form, onChange } = useForm(initialState);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      onChange(date, "fechaNacimiento");
    }
  };

  const dateTextColor = selectedDate ? "#000000" : "#aaaaaa"; // Cambia el color del texto según si hay una fecha seleccionada o no

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
      <TouchableOpacity onPress={toggleDatePicker} style={styles.dateInput}>
        <Text style={[styles.dateText, { color: dateTextColor }]}>
          {selectedDate ? selectedDate.toDateString() : "Fecha de nacimiento"}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={form.fechaNacimiento}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
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
      <PrimaryButton title="Registrarse" backgroundColor="#6372ff" />
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
  dateInput: {
    backgroundColor: "#ffffff",
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    justifyContent: "center",
  },
  dateText: {
    color: "#aaaaaa", // Color de texto gris por defecto
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
