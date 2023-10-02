import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Dimensions } from "react-native";
import { useForm } from "../hooks/useForm";
import { PrimaryButton } from "../components/Buttons/Button";
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomInput from "../components/TextInputs/CustomInput";
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
  const dateTextColor = selectedDate ? "#000000" : "#aaaaaa"; 
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false); 
  const validarNombre = (nombre) => {
    if (!nombre) { return "El nombre no puede estar vacio";} else { return true;}
  };
  const validarApellido =(apellido) => {
    if (!apellido) { return "El apeellido no puede estar vacio";} else { return true;}
  };
  const validarDNI = (DNI) => {
    if (DNI.lenght!=8){
      return "El dni debe tener 8 digitos.";
    }
    else if (!DNI) { return "Por favor complete el campo DNI";} 
    else if (typeof DNI !== "number") { return "El DNI Debe ser numeros enteros";}
    else { return true;}
   };
  const validarDomicilio = (domicilio) => {
    if (!domicilio) { return false;} else { return true;}
  };
  const validarEmail = (email) => {
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

  const registerChofer = () => {
    console.log("valores")
    console.log(form)
    if (!form.DNI || !form.nombre || !form.apellido || !form.domicilio || !form.email || !form.password) {
      alert("Por favor complete todos los campos.");
      return;
    }
    else {
      alert("Registrado correctamente");
      navigation.push("HomeChofer")
    }


  };
  useEffect(() => {
    const checkFormValidity = () => {
      const formValues = Object.values(form);
      const isFormFilled = formValues.every((value) => value !== ""); 
      setIsFormValid(isFormFilled);
    };
    checkFormValidity();
  }, [form]);

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



  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Complete los datos para el registro!</Text> 
      <CustomInput placeholder="Nombre" value={form.nombre} onChangeText={(value) => onChange(value, "nombre")} />
      <CustomInput placeholder="Apellido" value={form.apellido} onChangeText={(value) => onChange(value, "apellido")} />
      <CustomInput placeholder="Número de DNI" value={form.DNI} onChangeText={(value) => onChange(value, "DNI")} keyboardType="numeric" />
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
      <CustomInput placeholder="Domicilio" value={form.domicilio} onChangeText={(value) => onChange(value, "domicilio")} />
      <CustomInput placeholder="Correo electrónico" value={form.email} onChangeText={(value) => onChange(value, "email")} />
      <CustomInput placeholder="Contraseña" value={form.password} onChangeText={(value) => onChange(value, "password")} secureTextEntry={true}  />

      <PrimaryButton title="Registrarse" backgroundColor="#6372ff" disabled={!isFormValid} onPress={registerChofer} />
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
  errorText: {
    color: 'red',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 5,
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
    borderColor: '#7F44C2',
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