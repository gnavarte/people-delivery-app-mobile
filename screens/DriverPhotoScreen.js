import React, { useState, useEffect } from "react";
import { StyleSheet, Text, ScrollView, Image, View ,Alert} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useForm } from "../hooks/useForm";
import PhotoCaptureModal from "../components/Modals/PhotoCaptureModal";
import { PrimaryButton } from '../components/Buttons/Button';
import axios from "axios";
import { updateChofer } from "../controller/auth/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocation } from '../controller/auth/location';
import * as Location from 'expo-location';
import { getUserEmail } from "../controller/auth/auth";
export default function DriverPhotoScreen() {

  const navigation = useNavigation();

  const updateChoferPhoto = async (userID,updateFields) =>{
    const response_update=updateChofer(userID,updateFields);

  }
  const navigateToHomeChofer = async () => {
    const email =await AsyncStorage.getItem('email');
    const formData = new FormData();
    var imageName=email+"-driverPhoto";
    formData.append("file", { uri: form.driverPhoto, type: "image/jpeg", name: imageName });
    formData.append("upload_preset", "elusf95e"); 

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso de ubicación', 'No se otorgó permiso para acceder a la ubicación.', [{ text: 'OK' }]);
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    console.log('Ubicación actual:', location.coords);
    var latitude = location.coords.latitude;
    var longitude = location.coords.longitude;

    const userID = await getUserEmail(email);

    axios.post("https://api.cloudinary.com/v1_1/facumarianelli/image/upload", formData)
      .then(response => {
        const updateFields = {};
        updateFields.picturePath = response.data.secure_url;
        updateFields.status = true;
        updateChoferPhoto(userID,updateFields)
        navigation.navigate('HomeChofer',{latitude,longitude});
      })
      .catch(error => {
        console.error("Error al subir la imagen a Cloudinary:", error);
        Alert.alert("Error", "Hubo un problema al subir la imagen. Por favor, inténtalo de nuevo.");
      });
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
    aspectRatio: 16 / 9, 
    borderRadius: 5,
  },
});
