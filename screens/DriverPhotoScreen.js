import React, { useState, useEffect } from "react";
import { StyleSheet, Text, ScrollView, Image, View ,Alert} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useForm } from "../hooks/useForm";
import PhotoCaptureModal from "../components/Modals/PhotoCaptureModal";
import { PrimaryButton } from '../components/Buttons/Button';

export default function DriverPhotoScreen() {

  const navigation = useNavigation();

  const navigateToHomeChofer = () => {
    navigation.navigate('HomeChofer');
  }

  const initialState = {
    driverPhoto: null,
  };

  const { form, onChange } = useForm(initialState);
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const { driverPhoto } = form;
    return driverPhoto;
  };

  useEffect(() => {
    const formIsValid = validateForm();
    setIsFormValid(formIsValid);
  }, [form]);

  return (
    <View style={styles.container}>
        <Text style={styles.sectionTitle}>Foto de perfil</Text>
        <Text>Finalmente, requerimos que captures una imagen de tu rostro sin lentes ni sombreros.</Text>
        <PhotoCaptureModal modalTitle="Foto de perfil" onImageSelected={(imageUri) => onChange(imageUri, "driverPhoto")} />
        <PrimaryButton title="Continuar" onPress={navigateToHomeChofer} backgroundColor="#5985EB" disabled={!isFormValid} />
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
