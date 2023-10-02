import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeChoferScreen from '../../screens/HomeChoferScreen';
import EditProfileScreen from '../../screens/EditProfileScreen';
import TravelScreen from '../../screens/TravelHistoryScreen';
import EarningsScreen from '../../screens/EarningsScreen';

const Tab = createBottomTabNavigator();

const tabOptions = {
  tabBarStyle: {
    backgroundColor: '#5985EB',
  },
  tabBarActiveTintColor: '#D3D3fe',
  tabBarInactiveTintColor: 'white',
};

const TabBar = () => {
  const getTabIcon = (routeName) => {
    let iconName;

    switch (routeName) {
      case 'Inicio':
        iconName = 'home';
        break;
      case 'Billetera':
        iconName = 'cash';
        break;
      case 'Viajes':
        iconName = 'car';
        break;
      case 'Configuracion':
        iconName = 'settings';
        break;
      default:
        iconName = 'home'; // Icono predeterminado en caso de que no coincida ningún nombre de ruta
        break;
    }

    return iconName;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconName = getTabIcon(route.name);
          return <Icon name={iconName} color={color} size={size} />;
        },
        ...tabOptions,
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeChoferScreen}
        options={{ headerShown: false }}
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
