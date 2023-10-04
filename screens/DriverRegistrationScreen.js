import React, { useState, useEffect } from "react";
import { StyleSheet, Text, ScrollView, Image, View ,Alert} from "react-native";
import { useNavigation } from '@react-navigation/native';
import ImagePickerModal from "../components/Modals/ImagePickerModal";
import { PrimaryButton } from '../components/Buttons/Button';
import { useForm } from "../hooks/useForm";
import DatePicker from "../components/TextInputs/DatePicker";
import CustomInput from "../components/TextInputs/CustomInput";
import { useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
export default function DriverRegistrationScreen() {
  const navigation = useNavigation();

  const initialState = {
    licenseImage: null,
    dateOfIssue: null,
    expirationDate: null,
    classOfLicense: null,
  };

  const { form, onChange } = useForm(initialState);
  const [isFormValid, setIsFormValid] = useState(false);

  const getLatitiudeAndLongitude = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso de ubicación', 'No se otorgó permiso para acceder a la ubicación.', [{ text: 'OK' }]);
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    console.log('Ubicación actual:', location.coords);
    var latitude = location.coords.latitude;
    var longitude = location.coords.longitude;
    return { latitude, longitude };

  };

  const validateForm = () => {
    const { licenseImage, dateOfIssue, expirationDate, classOfLicense } = form;
    return licenseImage && dateOfIssue && expirationDate && classOfLicense;
  };


  useEffect(() => {
    const formIsValid = validateForm();
    setIsFormValid(formIsValid);
  }, [form]);

  const navigateToHomeChofer =async  () => {
    const response=await getLatitiudeAndLongitude();

    navigation.navigate('HomeChofer', {
      latitude: response.latitude,
      longitude: response.longitude,
    });

  };

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
        <Text style={styles.sectionTitle}>Licencia de Conducir</Text>
        <ImagePickerModal
          buttonText="Adjuntar Licencia de Conducir"
          modalTitle="Adjuntar Licencia de Conducir"
          onImageSelected={(uri) => onChange(uri, "licenseImage")}
        />
        {renderImagePreview(form.licenseImage)}
        <Text>Fecha de expedición:</Text>
        <DatePicker placeholder="Fecha de expedición" selectedDate={form.dateOfIssue} onDateChange={(date) => onChange(date, "dateOfIssue")} />
        <Text>Fecha de vencimiento:</Text>
        <DatePicker placeholder="Fecha de vencimiento" selectedDate={form.expirationDate} onDateChange={(date) => onChange(date, "expirationDate")} />
        <Text>Clase de Licencia:</Text>
        <CustomInput placeholder="Clase de Licencia" onChangeText={(text) => onChange(text, "classOfLicense")} />
      </ScrollView>
      <PrimaryButton title="Omitir por ahora" backgroundColor="grey" onPress={navigateToHomeChofer} />
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
