import React, { useState } from "react";
import { StyleSheet, Text, ScrollView, Image, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import ImagePickerModal from "../components/Modals/ImagePickerModal";
import { PrimaryButton } from '../components/Buttons/Button';

export default function DriverRegistrationScreen() {
  const [profileImage, setProfileImage] = useState(null);
  const [licenseImage, setLicenseImage] = useState(null);
  const [vehicleRegistrationImage, setVehicleRegistrationImage] = useState(null);
  const [vehicleFrontImage, setVehicleFrontImage] = useState(null);

  const navigation = useNavigation();

  const navigateToHomeChofer = () => {
    navigation.push('HomeChofer');
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
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.sectionTitle}>Foto de Perfil</Text>
        <ImagePickerModal
          buttonText="Adjuntar Foto de Perfil"
          modalTitle="Adjuntar Foto de Perfil"
          onImageSelected={(uri) => setProfileImage(uri)}
        />
        {renderImagePreview(profileImage)}
      </View>

      <View>
        <Text style={styles.sectionTitle}>Licencia de Conducir</Text>
        <ImagePickerModal
          buttonText="Adjuntar Licencia de Conducir"
          modalTitle="Adjuntar Licencia de Conducir"
          onImageSelected={(uri) => setLicenseImage(uri)}
        />
        {renderImagePreview(licenseImage)}
      </View>

      <View>
        <Text style={styles.sectionTitle}>Cédula del Vehículo</Text>
        <ImagePickerModal
          buttonText="Adjuntar Cédula del Vehículo"
          modalTitle="Adjuntar Cédula del Vehículo"
          onImageSelected={(uri) => setVehicleRegistrationImage(uri)}
        />
        {renderImagePreview(vehicleRegistrationImage)}
      </View>

      <View>
        <Text style={styles.sectionTitle}>Foto Frontal del Vehículo</Text>
        <ImagePickerModal
          buttonText="Adjuntar Foto Frontal del Vehículo"
          modalTitle="Adjuntar Foto Frontal del Vehículo"
          onImageSelected={(uri) => setVehicleFrontImage(uri)}
        />
        {renderImagePreview(vehicleFrontImage)}
      </View>
    </ScrollView>
    <PrimaryButton title="Enviar" onPress={navigateToHomeChofer} backgroundColor="#6372ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  previewImage: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 5,
  },
});
