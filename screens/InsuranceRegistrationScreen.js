import React, { useState, useEffect } from "react";
import { StyleSheet, Text, ScrollView, Image, View ,Alert} from "react-native";
import { useNavigation } from '@react-navigation/native';
import ImagePickerModal from "../components/Modals/ImagePickerModal";
import { PrimaryButton } from '../components/Buttons/Button';
import { useForm } from "../hooks/useForm";
import DatePicker from "../components/TextInputs/DatePicker";
import CustomInput from "../components/TextInputs/CustomInput";
import { useRoute } from "@react-navigation/native";

export default function InsuranceRegistrationScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const navigateToDriverPhoto = () => {
    const { usuario } = route.params;
    console.log("usuario", usuario)
    const usuarioActualizado = {
      ...usuario,
      seguro: {
        idSeguro: 1,
        numeroPoliza: form.policyNumber,
        proveedor: form.supplierName,
        fechaExpedicion: form.dateOfIssue,
        fechaVencimiento: form.expirationDate,
      },
    };
    console.log("Usuario actualizado:", usuarioActualizado)
    navigation.navigate('DriverPhotoScreen', { usuario: usuarioActualizado });

  };

  const initialState = {
    policyNumber: null,
    policyImage: null,
    supplierName: null,
    dateOfIssue: null,
    expirationDate: null,
  };

  const { form, onChange } = useForm(initialState);
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const { policyImage, supplierName, dateOfIssue, expirationDate } = form;
    return policyImage && supplierName && dateOfIssue && expirationDate;
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
        <Text style={styles.sectionTitle}>Seguro del vehículo</Text>
        <ImagePickerModal
          buttonText="Adjuntar Poliza de seguro"
          modalTitle="Adjuntar Poliza de seguro"
          onImageSelected={(uri) => onChange(uri, "policyImage")}
        />
        {renderImagePreview(form.licenseImage)}
        <Text>Nombre del proveedor:</Text>
        <CustomInput placeholder="Nombre del proveedor" value={form.supplierName} onChangeText={(value) => onChange(value, "supplierName")} />
        <Text> Numero Poliza de seguro:</Text>
        <CustomInput placeholder="Numero Poliza de seguro" value={form.policyNumber} onChangeText={(value) => onChange(value, "policyNumber")} />
        <Text>Fecha de expedición:</Text>
        <DatePicker placeholder="Fecha de expedición" selectedDate={form.dateOfIssue} onDateChange={(date) => onChange(date, "dateOfIssue")} />
        <Text>Fecha de vencimiento:</Text>
        <DatePicker placeholder="Fecha de vencimiento" selectedDate={form.expirationDate} onDateChange={(date) => onChange(date, "expirationDate")} />
      </ScrollView>
      <PrimaryButton title="Continuar" onPress={navigateToDriverPhoto} backgroundColor="#5985EB" disabled={!isFormValid} />
    
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
