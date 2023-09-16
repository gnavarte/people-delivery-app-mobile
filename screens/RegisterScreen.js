import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Dimensions } from "react-native";
import { useForm } from "../hooks/useForm";
import { PrimaryButton } from "../components/Buttons/Button";
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomInput from "../components/TextInputs/CustomInput";

const RegisterScreen = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [DNI, setDNI] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [domicilio, setDomicilio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);


  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      onChange(selectedDate, "fechaNacimiento");
    }
  };
  const registerChofer = () => {
    if (nombre && apellido && DNI && fechaNacimiento && domicilio && email && password) {
      console.log(nombre, apellido, DNI, fechaNacimiento, domicilio, email, password);
      navigation.push("LoadDataScreen")
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Complete los datos para el registro!</Text> 
      <CustomInput placeholder="Nombre" value={nombre} onChangeText={(value) => setNombre(value)} />
      <CustomInput placeholder="Apellido" value={apellido} onChangeText={(value) => setApellido(value)} />
      <CustomInput placeholder="Numero de DNI" value={DNI} onChangeText={(value) => setDNI(value)} />
      <CustomInput placeholder="Domicilio" value={domicilio} onChangeText={(value) => setDomicilio(value)} />
      <CustomInput placeholder="Correo electrónico" value={email} onChangeText={(value) => setEmail(value)} />
      <CustomInput placeholder="Contraseña" value={password} onChangeText={(value) => setPassword(value)} />
      <TouchableOpacity onPress={toggleDatePicker} style={styles.dateInput}>
        <Text style={styles.dateText}>Fecha de nacimiento</Text>
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


      <PrimaryButton title="Registrarse" backgroundColor="#6372ff" onPress={registerChofer} />
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
    borderWidth: 1,
    borderColor: '#7F44C2'

  },
  dateText: {
    color: "black", 
  },
  textStyle:{
    marginLeft: '7%',
    textAlign: 'center',
    fontSize: Dimensions.get('window').width*0.05,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
});