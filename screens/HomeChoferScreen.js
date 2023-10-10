// HomeChoferScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BotonCircular from '../components/Buttons/ButtonCircle';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { getStatusChofer } from '../controller/auth/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeChoferScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const latitude = route.params.latitude;
  const longitude = route.params.longitude;
  const [userStatus, setUserStatus] = useState(null);

  useEffect(() => {
    const getChoferStatus = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        const chofer_user = await getStatusChofer(email);
        var status = chofer_user.status;
        setUserStatus(status);
        console.log("status", status);
        var fullName=chofer_user.firstName+" "+chofer_user.lastName;
        await AsyncStorage.setItem('name', fullName);
        var imageProfile=chofer_user.picturePath;
        await AsyncStorage.setItem('imageProfile', imageProfile);
      } catch (error) {
        console.log('Error:', error);
      }
    };
    getChoferStatus();
  }, []); 

  const handleIniciar = () => {
    console.log("iniciamos");
  };
  const navigateLoadData = () => {
    navigation.navigate('DriverRegistrationScreen');
  }
    

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 25, textAlign: 'center' }}>Bienvenido a People Delivery</Text>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: latitude, longitude: longitude }}
            title={'Marker Title'}
            description={'Marker Description'}
          />
        </MapView>
      </View>
      <View style={styles.buttonContainer}>
        {userStatus === false ? (
          <TouchableOpacity style={styles.button} onPress={navigateLoadData}>
            <Text>Carga los datos faltantes para comenzar a usar la aplicación</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button}>
            <BotonCircular 
              backgroundColor="#7F44C2" 
              onPress={handleIniciar} 
              datosCargados={userStatus}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    padding: 20,
    borderRadius: 10,
  },
});

export default HomeChoferScreen;
