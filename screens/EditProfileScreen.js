import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
const EditProfileScreen = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };


  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          source={{
            uri: 'https://res.cloudinary.com/dgvlsnajj/image/upload/v1693921729/PeopleDelivery/ProfilePicture_vbryxo.webp',
          }}
          style={styles.image}
        />
      </View>
      <Text style={styles.descriptionText}>Juan Perez</Text>
      <Text style={styles.descriptionText}>Facu@gmai.com</Text>

      {/* Rectángulo que agrupa los elementos */}
      <View style={styles.rectangle}>
        <View style={styles.item}>
          <Icon name="lock" size={24} color="#7F44C2" />
          <Text style={styles.textLabel}>Cambiar contraseña</Text>
          <Icon name="chevron-right" size={24} color="black" />
        </View>
        <View style={styles.item}>
          <Icon name="car" size={24} color="#7F44C2" />
          <Text style={styles.textLabel}>Mis Autos</Text>
          <Icon name="chevron-right" size={24} color="black" />
        </View>
        <View style={styles.item}>
          <Icon name="Configuration" size={24} color="#7F44C2" />
          <Text style={styles.textLabel}>Ajustes</Text>
          <Icon name="chevron-right" size={24} color="black" />
        </View>
      </View>
      <View style={styles.rectangle}>
        <View style={styles.item}>
            <Icon name="exit" size={24} color="red" />
            <Text style={styles.textLabel}>Cerrar session</Text>
            <Icon name="chevron-right" size={24} color="black" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10, // Espacio entre elementos
  },
  descriptionText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#000000',
    textAlign: 'center',
  },
  image: {
    width: '20%',
    aspectRatio: 1,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 145,
    borderRadius: 75,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 18,
    color: 'white',
  },
  textLabel: {
    fontSize: 14,
    marginBottom: 5,
    color: '#000000',
  },
  rectangle: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    padding: 10,
    marginTop: 10,
  },

});

export default EditProfileScreen;
