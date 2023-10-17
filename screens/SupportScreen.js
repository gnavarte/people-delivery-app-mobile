import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Modal ,Alert, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TextInputCustomized from '../components/TextInputs/TextInputCustomized';
import PrimaryButton from '../components/Buttons/Button';
import CustomInput from '../components/TextInputs/CustomInput';
import DeleteConfirmationModal from '../components/Modals/Modal';
import TextInputCustomizedLarge from '../components/TextInputs/TextInputSupport';
import { sendSupportEmail } from '../controller/auth/email';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

    const enviarConsulta = async  (consulta,motivo) => {
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
          const email= await AsyncStorage.getItem('email');
          response= await sendSupportEmail(email,motivo,consulta)
          Alert.alert("Su consulta fue enviada con exito. pronto recibira novedades por correo")
          navigation.goBack();
        }
    }

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Image source={require('../assets/Support.png')} style={styles.illustration} />
          <Text style={styles.titleText}>¡Contactate con soporte!</Text>
        </View>
        <View style={styles.inputsContainer}>
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
        </View>
        <View style={{ alignSelf:'center' }}>
          <PrimaryButton title="ENVIAR CONSULTA" onPress={() => enviarConsulta(consulta, motivo)} backgroundColor="#5985EB" />
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
  export default SupportScreen;