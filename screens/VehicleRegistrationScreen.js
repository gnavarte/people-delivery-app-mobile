import React, { useState, useEffect } from "react";
import { StyleSheet, Text, ScrollView, Image, View ,Alert} from "react-native";
import { useNavigation } from '@react-navigation/native';
import ImagePickerModal from "../components/Modals/ImagePickerModal";
import { PrimaryButton } from '../components/Buttons/Button';
import { useForm } from "../hooks/useForm";
import DatePicker from "../components/TextInputs/DatePicker";
import CustomInput from "../components/TextInputs/CustomInput";
import { createAuto } from "../controller/auth/autos";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function VehicleRegistrationScreen() {
  const navigation = useNavigation();

  const navigateToInsuranceRegistration = async () => {
    const email = await AsyncStorage.getItem('email');
    const response= await createAuto(form.vehicleYear, form.vehiclePlate, form.engineNumber, form.vehicleBrand, form.vehicleModel, form.vehicleColor, form.chassisNumber, form.vtvExpiration, form.vehicleMileage, email);
    console.log(response)
    navigation.navigate('InsuranceRegistrationScreen');
  };

  const initialState = {
    vehicleImage: null,
    vehicleBrand: null,
    vehicleModel: null,
    vehicleColor: null,
    vehicleYear: null,
    vehiclePlate: null,
    vehicleMileage: null,
    engineNumber: null,
    chassisNumber: null,
    vtvImage: null,
    vtvExpiration: null,
  };

  const { form, onChange } = useForm(initialState);
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const { vehicleImage, vehicleBrand, vehicleModel, vehicleColor, vehicleYear, vehiclePlate, vehicleMileage, engineNumber, chassisNumber, vtvImage, vtvExpiration } = form;
    return vehicleImage && vehicleBrand && vehicleModel && vehicleColor && vehicleYear && vehiclePlate && vehicleMileage && engineNumber && chassisNumber && vtvImage && vtvExpiration;
  };

  useEffect(() => {
    const formIsValid = validateForm();
    setIsFormValid(formIsValid);
  }, [form]);

  const renderImagePreview = (imageUri) => {
    if (imageUri) {
      return (
        <View>
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.sectionTitle}>Datos del vehículo</Text>
        <ImagePickerModal
          buttonText="Adjuntar Imagen del vehículo"
          modalTitle="Adjuntar Imagen del vehículo"
          onImageSelected={(uri) => onChange(uri, "vehicleImage")}
        />
        {renderImagePreview(form.licenseImage)}
        <Text>Marca:</Text>
        <CustomInput placeholder="Marca del vehículo" value={form.vehicleBrand} onChangeText={(value) => onChange(value, "vehicleBrand")} />
        <Text>Modelo:</Text>
        <CustomInput placeholder="Modelo del vehículo" value={form.vehicleModel} onChangeText={(value) => onChange(value, "vehicleModel")} />
        <Text>Color:</Text>
        <CustomInput placeholder="Color del vehículo" value={form.vehicleColor} onChangeText={(value) => onChange(value, "vehicleColor")} />
        <Text>Año:</Text>
        <CustomInput placeholder="Año del vehículo" value={form.vehicleYear} onChangeText={(value) => onChange(value, "vehicleYear")} />
        <Text>Patente:</Text>
        <CustomInput placeholder="Patente del vehículo" value={form.vehiclePlate} onChangeText={(value) => onChange(value, "vehiclePlate")} />
        <Text>Kilometraje:</Text>
        <CustomInput placeholder="Kilometraje del vehículo" value={form.vehicleMileage} onChangeText={(value) => onChange(value, "vehicleMileage")} />
        <Text>Número de motor:</Text>
        <CustomInput placeholder="Número de motor" value={form.engineNumber} onChangeText={(value) => onChange(value, "engineNumber")} />
        <Text>Número de chasis:</Text>
        <CustomInput placeholder="Número de chasis" value={form.chassisNumber} onChangeText={(value) => onChange(value, "chassisNumber")} />
        <Text>Fecha de vencimiento de VTV:</Text>
        <DatePicker placeholder="Fecha de vencimiento de VTV" selectedDate={form.vtvExpiration} onDateChange={(date) => onChange(date, "vtvExpiration")} />
        <ImagePickerModal
          buttonText="Adjuntar VTV"
          modalTitle="Adjuntar VTV"
          onImageSelected={(uri) => onChange(uri, "vtvImage")}
        />
        {renderImagePreview(form.vtvImage)}
      </ScrollView>
      <PrimaryButton title="Continuar" onPress={navigateToInsuranceRegistration} backgroundColor="#5985EB" disabled={!isFormValid} />
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  previewImage: {
    width: "100%",
    aspectRatio: 16 / 9, // Establece la relación de aspecto 16:9
    borderRadius: 5,
  },
});
