import { Alert } from 'react-native';
import * as Location from 'expo-location';
export const getLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permiso de ubicación', 'No se otorgó permiso para acceder a la ubicación.', [{ text: 'OK' }]);
    return null;
  }
  let location = await Location.getCurrentPositionAsync({});
  console.log('Ubicación actual:', location.coords);
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude
  };
};
