import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Alert } from "react-native";
import { baseStyles } from "../themes/theme";
import { useForm } from "../hooks/useForm";
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomInput from "../components/TextInputs/CustomInput";
import { PrimaryButton } from "../components/Buttons/Button";
import { useNavigation } from "@react-navigation/native";
import { registerUser } from "../controller/auth/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
const RegisterScreen = () => {
  const initialState = {
    nombre: "",
    apellido: "",
    DNI: "",
    fechaNacimiento: new Date(),
    domicilio: "",
    email: "",
    password: "",
    telefono: "",
    sexo: "",

  };

  const { form, onChange } = useForm(initialState);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigation = useNavigation();
  const validarNombre = (nombre) => {
    return nombre ? true : "El nombre no puede estar vacío";
  };

  const validarApellido = (apellido) => {
    return apellido ? true : "El apellido no puede estar vacío";
  };

  const validarDNI = (DNI) => {
    if (DNI.length !== 8) {
      return "El DNI debe tener 8 dígitos.";
    } else if (!DNI) {
      return "Por favor complete el campo DNI";
    } else if (isNaN(DNI)) {
      return "El DNI debe ser números enteros";
    }
    return true;
  };

  const validarDomicilio = (domicilio) => {
    return domicilio ? true : false;
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

  const registerChofer = async () => {

    const booleanNombre = validarNombre(form.nombre);
    const booleanApellido = validarApellido(form.apellido);
    const booleanDNI = validarDNI(form.DNI);
    const booleanDomicilio = validarDomicilio(form.domicilio);
    const booleanEmail = validarEmail(form.email);
    const booleanPassword = validatePassword(form.password);

    if (
      booleanNombre === true &&
      booleanApellido === true &&
      booleanDNI === true &&
      booleanDomicilio === true &&
      booleanEmail === true &&
      booleanPassword === true
    ) {
      const responseChofer=await registerUser(form.nombre, form.apellido, form.domicilio, form.fechaNacimiento, form.DNI, form.telefono, form.email, form.password);
      if (responseChofer!== ""){
        const usuario = {
          id: 0, // Puedes asignar un valor adecuado si lo tienes
          telefono: form.telefono,
          nombre: form.nombre,
          apellido: form.apellido,
          dni: form.DNI,
          sexo: form.sexo,
          email: form.email,
          direccion: form.domicilio,
          fechaNacimiento: form.fechaNacimiento,
          contrasenia: form.password,
          foto: "", 
          verificado: "EN_PROGRESO", 
          licencia: {
            idLicencia: 0,
            otorgamiento: "", 
            vencimiento: "", 
            clase: "", 
          },
          vehiculo: {
            idVehiculo: 0, 
            ultimaVtv: "", 
            anio: 0, 
            dominio: "",
            modelo: "",
            uso: "",
            tipoVehiculo: "",
            chasis: "",
            motor: "",
            seguro: {
              idSeguro: 0, 
              nroPoliza: "",
              fechaDesde: "",
              fechaHasta: "",
              proveedor: "",
            },
            color: "",
          },
          notas: "", 
          fechaValidacion: "", 
          numeroCedula: "",
          tipoCedula: "",
        };
        console.log(usuario)
        Alert.alert("Su usuario fue registrado correctamente")
        await AsyncStorage.setItem("email", form.email);
        
        navigation.push("DriverRegistrationScreen", { usuario });
      }
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

  const dateTextColor = selectedDate ? "#000000" : "#aaaaaa";

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
      <CustomInput placeholder="Sexo" value={form.sexo} onChangeText={(value) => onChange(value, "sexo")} />
      <CustomInput placeholder="Telefono" value={form.telefono} onChangeText={(value) => onChange(value, "telefono")} />
      <CustomInput placeholder="Contraseña" value={form.password} onChangeText={(value) => onChange(value, "password")} secureTextEntry={true} />

      <PrimaryButton title="Registrarse" backgroundColor="#6372ff" disabled={!isFormValid} onPress={registerChofer} />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: baseStyles.padding,
    justifyContent: "center",
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
    marginVertical: 10,
    paddingLeft: 16,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: '#7F44C2',
  },
  dateText: {
    color: "black",
  },
  textStyle: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').width * 0.05,
    marginBottom: 20,
  }, 
});
