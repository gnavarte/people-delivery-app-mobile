import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeChoferScreen from '../../screens/HomeChoferScreen';
import EditChoferScreen from '../../screens/EditChoferScreen';

const Tab = createBottomTabNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = 'home';
          } else if (route.name === 'Ganancias') {
            iconName = 'cash'; 
          } else if (route.name === 'Mis Viajes') {
            iconName = 'car'; 
          } else if (route.name === 'Configuracion') {
            iconName = 'settings'; 
          }

          return <Icon name={iconName} color={color} size={size} />;
        },
        tabBarStyle: {
          backgroundColor: '#5985EB', 
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'white',
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeChoferScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Ganancias"
        component={HomeChoferScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Mis Viajes"
        component={HomeChoferScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Configuracion"
        component={EditChoferScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabBar;
