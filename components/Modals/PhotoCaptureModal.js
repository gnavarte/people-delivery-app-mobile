import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";

const PhotoCaptureModal = ({ modalTitle, onImageSelected }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        cameraType: "front",
      });

      if (!result.canceled) {
        const selectedAsset = result.assets[0];
        const uri = selectedAsset.uri;
        setSelectedImage(uri);
        onImageSelected(uri);
        setModalVisible(false); // Cerrar el modal después de seleccionar una imagen
      }
    } catch (error) {
      console.error('Error al tomar una foto: ', error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.roundButton}
        onPress={() => setModalVisible(true)}
      >
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.roundButtonImage} />
        ) : (
          <MaterialIcons name="photo-camera" size={24} color="#7F44C2" />
        )}
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setModalVisible(false)}
            >
              <MaterialIcons name="close" size={24} color="#000" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <View style={styles.imageContainer}>
              {selectedImage && <Image source={{ uri: selectedImage }} style={styles.selectedImage} />}
            </View>

            <TouchableOpacity
              style={styles.pickButton}
              onPress={takePhoto}
            >
              <MaterialIcons name="photo-camera" size={24} color="#fff" />
              <Text style={styles.buttonText}>Tomar una Foto</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  roundButton: {
    borderColor: "#7F44C2",
    borderWidth: 1,
    width: 200,
    height: 200,
    marginVertical: 10,
    padding: 20,
    borderRadius: 100,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  roundButtonImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  imageContainer: {
    marginBottom: 20,
  },
  selectedImage: {
    width: "100%",
    aspectRatio: 1 / 1,
    borderRadius: 5,
  },
  pickButton: {
    backgroundColor: "#7F44C2",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default PhotoCaptureModal;
