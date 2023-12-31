import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions ,TouchableOpacity,Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import ModalDeleteCar from '../Modals/ModalDeleteCar';

const AutoCard = ({ auto }) => {
  const [showModal, setShowModal] = useState(false);
 const eliminarAuto=()=>{
    console.log("Eliminando auto")   
 }
 const handleDeleteIconPress = () => {
  setShowModal(true);
}
const handleCloseModal = () => {
  setShowModal(false);
}

const handleConfirmDelete = () => {
  console.log('Datos del auto:', auto);
  Alert.alert("Se ha enviado una peticion para eliminar el auto, revisa tu correo!")
  setShowModal(false);
}

return (
  <View style={styles.card}>
      <Image source={{
            uri: "https://res.cloudinary.com/dgvlsnajj/image/upload/v1697208654/car_estandar1_icvwko.png",
          }}style={styles.imagen} />
      <View style={styles.info}>
        <Text style={styles.textos}>Marca: {auto.marca}</Text>
        <Text style={styles.textos}>Año: {auto.año}</Text>
        <Text style={styles.textos}>Color: {auto.color}</Text>
        <Text style={styles.textos}>Patente: {auto.dominio}</Text>
        <TouchableOpacity onPress={handleDeleteIconPress}>
          <AntDesign name="closecircle" size={24} color="#7F44C2" />
        </TouchableOpacity>
      </View>
      <ModalDeleteCar 
        showModal={showModal} 
        onClose={handleCloseModal} 
        onConfirm={handleConfirmDelete} 
      />
  </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '80%',
    height: '25%'
  },
  imagen: {
    width: '45%', 
    height: '100%', 
    marginRight: 10,
    resizeMode: 'contain',
  },
  info: {
    flex: 1,
    justifyContent: 'center'
  },
  textos: {
    fontSize: Dimensions.get('window').width*0.05,
    fontFamily: 'Roboto',
  },
  titulo: {
    fontSize: Dimensions.get('window').width*0.05,
    fontFamily: 'Roboto',
    color: '#7F44C2',
    marginBottom: 10,
    textAlign: 'center',
  },

});

export default AutoCard;