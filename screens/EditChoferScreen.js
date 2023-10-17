import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Modal ,Alert, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TextInputCustomized from '../components/TextInputs/TextInputCustomized';
import PrimaryButton from '../components/Buttons/Button';
import CustomInput from '../components/TextInputs/CustomInput';
import DeleteConfirmationModal from '../components/Modals/Modal';
import { useRoute } from '@react-navigation/native';
import { getUserEmail  ,updateChofer} from '../controller/auth/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteUser } from '../controller/auth/auth';

const EditChoferScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [showModal, setShowModal] = useState(false);
    const email =route.params.email;
    const closeModal = () => {
      setShowModal(false);
    };
  
    const confirmDelete = async () => {
      const email = await AsyncStorage.getItem('email');
      const userID = await getUserEmail(email);
      const userDelete = await deleteUser(userID);
      if (userDelete==200) {
        Alert.alert("Usuario eliminado exitosamente")
        navigation.navigate('HomeScreen');
        closeModal();
      }
      
    };
    const openModalEliminar = () => {
      setShowModal(true);
    };
    const navigateToRegister = () => {
      console.log("asd")
    };
    const cambiarDatos = async () => {    
      if (!nombre && !apellido && !domicilio) {
        Alert.alert("No se realizó ningún cambio.");
      } else {
        const email = await AsyncStorage.getItem('email');

        const userID = await getUserEmail(email);
        const updateFields = {};
    
        if (nombre) {
          updateFields.firstName = nombre;
        }
    
        if (apellido) {
          updateFields.lastName = apellido;
        }
    
        if (domicilio) {
          updateFields.address = domicilio;
        }
    
        const userUpdate = await updateChofer(userID, updateFields);
        console.log(userUpdate)
      }
    };
    
    
  
    return (
      <View style={styles.container}>
        <Image source={require('../assets/Settings.png')} style={styles.illustration} />
        <Text style={styles.titleText}>Informacion de la cuenta:</Text>
  
        <Text style={styles.textLabel}>Email</Text>
        <TextInputCustomized value={email}  placeholder={email} backgroundColor="#FFFFFF" placeholderTextColor="#000000" />
  
        <Text style={styles.textLabel}>Nombre</Text>
        <TextInputCustomized value={nombre} onChangeText={setNombre}  placeholder="Ingresa tu nuevo Nombre" backgroundColor="#FFFFFF" placeholderTextColor="#000000" />
  
        <Text style={styles.textLabel}>Apellido</Text>
        <TextInputCustomized  value={apellido} onChangeText={setApellido} placeholder="Ingresa tu nuevo Apellido" backgroundColor="#FFFFFF" placeholderTextColor="#000000" />
  
        <Text style={styles.textLabel}>Domicilio</Text>
        <TextInputCustomized value={domicilio} onChangeText={setDomicilio}  placeholder="Ingresa tu nuevo domicilio" backgroundColor="#FFFFFF" placeholderTextColor="#000000" />
          
        <View style={styles.buttonsContainer}>
          <PrimaryButton title="CAMBIAR DATOS" onPress={cambiarDatos} backgroundColor="#5985EB" />
          <PrimaryButton title="ELIMINAR CUENTA" onPress={openModalEliminar} backgroundColor="#000000" />
        </View>

        <DeleteConfirmationModal showModal={showModal} onClose={closeModal} onConfirm={confirmDelete} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F2F2F2',
      paddingHorizontal: 40,
      paddingBottom: 40,
    },
    illustration: {
      width: Dimensions.get('window').width * 0.40,
      height: Dimensions.get('window').width * 0.40,
      alignSelf: 'center',
      marginVertical: 10,
    },
    titleText: {
      fontSize: Dimensions.get('window').width*0.04,
      marginBottom: 5,
      color:'#000000'
    },
    textLabel: {
      fontSize: Dimensions.get('window').width*0.04,
      marginVertical: 5,
      color: '#000000',
    },
    buttonsContainer: {
      justifyContent: 'space-between',
    },
  });
  export default EditChoferScreen;