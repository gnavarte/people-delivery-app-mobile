import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeChoferScreen from '../../screens/HomeChoferScreen';
import EditChoferScreen from '../../screens/EditChoferScreen';
import EditProfileScreen from '../../screens/EditProfileScreen';
import TravelScreen from '../../screens/TravelHistoryScreen';
import EarningsScreen from '../../screens/EarningsScreen';
import { useRoute } from '@react-navigation/native';
const Tab = createBottomTabNavigator();

const TabBar = () => {
  const route = useRoute();
  const { latitude, longitude } = route.params;
  console.log('Latitud:', latitude);
  console.log('Longitud:', longitude);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = 'home';
          } else if (route.name === 'Billetera') {
            iconName = 'cash'; 
          } else if (route.name === 'Viajes') {
            iconName = 'car'; 
          } else if (route.name === 'Configuracion') {
            iconName = 'settings'; 
          }

          return <Icon name={iconName} color={color} size={size} />;
        },
        tabBarStyle: {
          backgroundColor: '#5985EB', 
        },
        tabBarActiveTintColor: '#D3D3fe', // Cambia el color cuando está seleccionado
        tabBarInactiveTintColor: 'white', // Cambia el color cuando no está seleccionado
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeChoferScreen}
        options={{ headerShown: false }}
        initialParams={{ latitude, longitude }}
      />
      <Tab.Screen
        name="Billetera"
        component={EarningsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Viajes"
        component={TravelScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Configuracion"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabBar;
