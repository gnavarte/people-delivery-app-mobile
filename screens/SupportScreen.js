import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Modal ,Alert, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TextInputCustomized from '../components/TextInputs/TextInputCustomized';
import PrimaryButton from '../components/Buttons/Button';
import CustomInput from '../components/TextInputs/CustomInput';
import DeleteConfirmationModal from '../components/Modals/Modal';
import TextInputCustomizedLarge from '../components/TextInputs/TextInputSupport';
const SupportScreen = () => {
    const navigation = useNavigation();
  
    const [motivo, setMotivo] = useState('');
    const [consulta, setConsulta] = useState('');

    const validateMotivo = (motivo) => {
        if (!motivo) {
            return "El motivo de la consulta no puede estar vacío.";
        }
        return true;
    }
    const validateConsulta = (consulta) => {
        if (!consulta) {
            return "La consulta no puede estar vacía.";
        }
        return true;
    }

    const enviarConsulta = (consulta,motivo) => {
        var booleanConsulta=validateConsulta(consulta)
        var booleanMotivo=validateMotivo(motivo)
        if (booleanConsulta!= true && booleanMotivo != true){
            Alert.alert("Por favor complete ambos campos")
        }
        else if (booleanConsulta == true && booleanMotivo != true){
            Alert.alert(booleanMotivo)
        }
        else if (booleanConsulta!= true && booleanMotivo == true){
            Alert.alert(booleanConsulta)
        }
        else if (booleanConsulta && booleanMotivo === true)
        {
          Alert.alert("Consulta enviada")
          navigation.push("HomeChofer")
        }
    }

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Image source={{ uri: 'https://res.cloudinary.com/dgvlsnajj/image/upload/v1693694980/PeopleDelivery/Icono_setting_cwgx18.png' }}
          style={styles.image}
          />
        </View>
        <Text style={styles.subtitleText}>¡Contactate con soporte!</Text>
  
        <Text style={styles.textLabel}>Motivo de consulta</Text>

        <TextInputCustomized value={motivo} onChangeText={setMotivo}  placeholder="Ingrese el motivo de su consulta" backgroundColor="#FFFFFF" placeholderTextColor="#000000" />
  
        <Text style={styles.textLabel}>Consulta</Text>
        <TextInputCustomizedLarge
            placeholder="Escribe tu consulta aquí"
            value={consulta}
            onChangeText={setConsulta}
            backgroundColor="#FFFFFF"
            placeholderTextColor="#000000"
        />
        <View style={styles.contenedor}>
        <TouchableOpacity style={styles.buttonEditarF} onPress={() => enviarConsulta(consulta, motivo)}>
          <PrimaryButton title="ENVIAR CONSULTA" onPress={() => enviarConsulta(consulta, motivo)} backgroundColor="#5985EB" />
        </TouchableOpacity>

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
  export default SupportScreen;