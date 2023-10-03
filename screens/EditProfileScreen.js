import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState('');
  const closeAccount = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que deseas cerrar la sesión?",
      [
        {
          text: "No",
          style: "cancel"
        },
        { text: "Sí", onPress: () => cerrarSession() }
      ],
      { cancelable: false }
    );
  }
  const handleGoBack = () => {
    navigation.goBack();
  };

  const cerrarSession = () => {
    // aca debemos limpiar el storage , etc.
    navigation.push("HomeScreen")
  }
  const navigateToChangePassword = () => {
    navigation.push("NewPasswordScreen", { email: userEmail } )
  }
  const navigateToMyCars = () => {
    navigation.push("MisAutosScreen")
  }
  const navigateToSettings = () => {
    navigation.push("EditChoferInfoScreen")
  }
  const navigateToSupprot = () => {
    navigation.push("SupportScreen")
  }
  useEffect(() => {
    const getUserEmailFromStorage = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        if (email !== null) {
          setUserEmail(email);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUserEmailFromStorage();
  }, []);
  


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
      <Text style={styles.descriptionText}>{userEmail}</Text>

      <View style={styles.rectangle}>
        <View style={styles.item}>
          <Icon name="lock" size={24} color="#7F44C2" />
          <Text style={styles.textLabel}>Cambiar contraseña</Text>
          <Icon name="chevron-right" size={24} color="black" onPress={navigateToChangePassword}  />
        </View>
        <View style={styles.item}>
          <Icon name="car" size={24} color="#7F44C2" />
          <Text style={styles.textLabel}>Mis Autos</Text>
          <Icon name="chevron-right" size={24} color="black" onPress={navigateToMyCars} />
        </View>
        <View style={styles.item}>
          <MaterialIcons name="settings" size={24} color="#7F44C2" />
          <Text style={styles.textLabel}>Ajustes</Text>
          <Icon name="chevron-right" size={24} color="black" onPress={navigateToSettings} />
        </View>
        <View style={styles.item}>
          <MaterialIcons name="support-agent" size={24} color="#7F44C2" />
          <Text style={styles.textLabel}>Soporte</Text>
          <Icon name="chevron-right" size={24} color="black" onPress={navigateToSupprot} />
        </View>
      </View>
      <View style={styles.rectangle}>
        <View style={styles.item}>
            <AntDesign name="closesquare" size={24} color="red" />
            <Text style={styles.textLabel} >Cerrar session</Text>
            <Icon name="chevron-right" size={24} color="black" onPress={closeAccount} />
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
    marginBottom: 10, 
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
