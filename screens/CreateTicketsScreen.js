import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Modal ,Alert, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TextInputCustomized from '../components/TextInputs/TextInputCustomized';
import PrimaryButton from '../components/Buttons/Button';
import CustomInput from '../components/TextInputs/CustomInput';
import DeleteConfirmationModal from '../components/Modals/Modal';
import TextInputCustomizedLarge from '../components/TextInputs/TextInputSupport';
import { createTicket } from '../controller/auth/tickets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

const CreateTicketScreen = () => {
    const navigation = useNavigation();
    const route=useRoute();
    const idSolicitante = route.params.idSolicitante;
    const idReclamado=route.params.idReclamado;
    const idViaje= route.params._id
  
    const [motivo, setMotivo] = useState('');
    const [detalle, setDetalle] = useState('');

    const validateMotivo = (motivo) => {
        if (!motivo) {
            return "El motivo del ticket no puede estar vacío.";
        }
        return true;
    }
    const validateDetalle = (detalle) => {
        if (!detalle) {
            return "El ticket no puede estar vacío.";
        }
        return true;
    }

    const enviarTicket = async  (detalle,motivo) => {
        var booleanDetalle=validateDetalle(detalle)
        var booleanMotivo=validateMotivo(motivo)
        if (booleanDetalle!= true && booleanMotivo != true){
            Alert.alert("Por favor complete ambos campos")
        }
        else if (booleanDetalle == true && booleanMotivo != true){
            Alert.alert(booleanMotivo)
        }
        else if (booleanDetalle!= true && booleanMotivo == true){
            Alert.alert(booleanDetalle)
        }
        else if (booleanDetalle && booleanMotivo === true && String(detalle).length>250){
          Alert.alert("El detalle no puede superar los 250 caracteres")
        }
        else if (booleanDetalle && booleanMotivo === true && String(detalle).length<=250)
        {
          datosTicket=   {
            'idSolicitante' : idSolicitante,
            'idReclamado':idReclamado,
            'idViaje': idViaje,
            'asunto':motivo,
            'detalle': detalle,
            'tipoUsuario': 'CHOFER'

          }
          response= await createTicket(datosTicket)
          Alert.alert("Su ticket fue enviado con exito.")
          navigation.goBack();
        }
    }

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Image source={require('../assets/Support.png')} style={styles.illustration} />
          <Text style={styles.titleText}>Genere un Ticket de Reclamo!</Text>
        </View>
        <View style={styles.inputsContainer}>
          <Text style={styles.textLabel}>Motivo de ticket</Text>
          <TextInputCustomized value={motivo} onChangeText={setMotivo}  placeholder="Ingrese el motivo de su ticket" backgroundColor="#FFFFFF" placeholderTextColor="#000000" />
          <Text style={styles.textLabel}>Detalle ({detalle.length}/250 caracteres)</Text>
          <TextInputCustomizedLarge
              maxLength={5}
              placeholder="Escribe tu reclamo aquí"
              value={detalle}
              onChangeText={setDetalle}
              backgroundColor="#FFFFFF"
              placeholderTextColor="#000000"
          />
        </View>
        <View style={{ alignSelf:'center' }}>
          <PrimaryButton title="ENVIAR TICKET" onPress={() => enviarTicket(detalle, motivo)} backgroundColor="#5985EB" />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 40,
      paddingBottom: 40,
      backgroundColor: '#F2F2F2',
      justifyContent: 'center',
    },
    titleContainer: {
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: 10,
    },
    illustration: {
      width: Dimensions.get('window').width * 0.65,
      height: Dimensions.get('window').width * 0.65,
    },
    inputsContainer: {
      marginBottom: 20,
    },
    titleText: {
      fontSize: Dimensions.get('window').width*0.04,
      color:'#000000'
    },
    textLabel: {
      fontSize: Dimensions.get('window').width*0.04,
      marginVertical: 10,
      color: '#000000',
    },
  });
  export default CreateTicketScreen;