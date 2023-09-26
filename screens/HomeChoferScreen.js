import React from 'react';
import { View, Text, TouchableOpacity ,StyleSheet} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BotonCircular from '../components/Buttons/ButtonCircle';
import { useRoute } from '@react-navigation/native';

const HomeChoferScreen = () => {
  // const { latitude, longitude } = route.params;
  const handleIniciar = () => {
    console.log("iniciamos")
  }
  // const route = useRoute();
  // const latitude=route.params.latitude;
  // const longitude=route.params.longitude;

  // console.log('Latitud:', latitude);
  // console.log('Longitud:', longitude);


  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 25 , textAlign: 'center' }}>Bienvenido a People Delivery</Text>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
            title={'Marker Title'}
            description={'Marker Description'}
          />
        </MapView>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
        >
          <BotonCircular backgroundColor="#7F44C2" onPress={handleIniciar} />
        </TouchableOpacity>
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
