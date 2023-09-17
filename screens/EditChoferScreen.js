import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Modal ,Alert, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TextInputCustomized from '../components/TextInputs/TextInputCustomized';
import PrimaryButton from '../components/Buttons/Button';
import CustomInput from '../components/TextInputs/CustomInput';
const EditChoferScreen = () => {
    const navigation = useNavigation();
  
    const [email, setEmail] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [showModal, setShowModal] = useState(false);

    const openModalEliminar = () => {
      setShowModal(true);
    };
    const navigateToRegister = () => {
      console.log("asd")
    };
    const cambiarDatos = () => {    
      if (!nombre && !apellido && !domicilio) {
        Alert.alert("No se realizó ningún cambio.");
      }
    };
    
  
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Image source={{ uri: 'https://res.cloudinary.com/dgvlsnajj/image/upload/v1693694980/PeopleDelivery/Icono_setting_cwgx18.png' }}
          style={styles.image}
          />
        </View>
        <Text style={styles.subtitleText}>Informacion de la cuenta:</Text>
  
        <Text style={styles.textLabel}>Email</Text>

        <TextInputCustomized value={email} onChangeText={setEmail}  placeholder="facu@gmail.com" backgroundColor="#FFFFFF" placeholderTextColor="#000000" />
  
        <Text style={styles.textLabel}>Nombre</Text>
        <TextInputCustomized value={nombre} onChangeText={setNombre}  placeholder="Ingresa tu nuevo Nombre" backgroundColor="#FFFFFF" placeholderTextColor="#000000" />
  
        <Text style={styles.textLabel}>Apellido</Text>
        <TextInputCustomized  value={apellido} onChangeText={setApellido} placeholder="Ingresa tu nuevo Apellido" backgroundColor="#FFFFFF" placeholderTextColor="#000000" />
  
        <Text style={styles.textLabel}>Domicilio</Text>
        <TextInputCustomized value={domicilio} onChangeText={setDomicilio}  placeholder="Ingresa tu nuevo domicilio" backgroundColor="#FFFFFF" placeholderTextColor="#000000" />
  
        
        <View style={styles.contenedor}>
        <TouchableOpacity style={styles.buttonEditarF} onPress={cambiarDatos}>
          <PrimaryButton title="CAMBIAR DATOS" onPress={cambiarDatos} backgroundColor="#5985EB" />
        </TouchableOpacity>
  
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <PrimaryButton title="ELIMINAR CUENTA" onPress={openModalEliminar} backgroundColor="#000000" />
        </TouchableOpacity>
        </View>
        
  
        <Modal visible={showModal} animationType="fade" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>¿Está seguro que quiere eliminar la cuenta?</Text>
  
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButton} onPress={navigateToRegister}>
                  <PrimaryButton title="ELIMINAR CUENTA" onPress={navigateToRegister} backgroundColor="#000000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButtonC} onPress={() => setShowModal(false)}>
                  <PrimaryButton title="CANCELAR" onPress={() => setShowModal(false)} backgroundColor="#D9D9D9" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
    image: {
      width: '20%',
      aspectRatio: 1,
      alignSelf: 'center',
      marginTop: 20,
      marginBottom: 20,
      marginLeft:145
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 60,
      marginBottom: 20,
    },
    titleText: {
      fontSize: Dimensions.get('window').width*0.05,
      color: 'white',
    },
    subtitleText: {
      fontSize: Dimensions.get('window').width*0.04,
      marginBottom: 10,
      color:'#000000'
    },
    textLabel: {
      fontSize: Dimensions.get('window').width*0.04,
      marginBottom: 5,
      color: '#000000',
    },
    button: {
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
      alignItems: 'center',
    },
    buttonEditarF: {
      marginBottom: '5%',
      alignItems: 'center',
    },
    contenedor:{
      flex:1,
      justifyContent:'flex-end'
    },
    buttonEditar: {
      color: 'black',
      fontSize: Dimensions.get('window').width*0.04,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    modalText: {
      fontSize: Dimensions.get('window').width*0.04,
      marginBottom: 20,
      textAlign: 'center',
    },
    modalButtons: {
      flexDirection: 'row',
    },
    modalButton: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    modalButtonC: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 5,
      alignItems: 'center',
      },
    modalButtonText: {
      color: 'white',
      fontSize: Dimensions.get('window').width*0.04,
  
    },
    modalButtonTextC:{
      color: 'black',
      fontSize: Dimensions.get('window').width*0.04,
  
    }
  });
  export default EditChoferScreen;