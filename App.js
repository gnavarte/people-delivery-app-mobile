import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Dimensions } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import InitialScreen from './screens/InitialScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import InputCodeScreen from './screens/InputCodeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import EditChoferScreen from './screens/EditChoferScreen';
import HomeChoferScreen from './screens/HomeChoferScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import NewPasswordScreen from './screens/NewPasswordScreen';
import MisAutosScreen from './screens/MisAutosScreen';
import NewPasswordForgotScreen from './screens/NewPasswordForgotScreen';
import TabBar from './components/TabBar/TabBar';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack=createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          title: null,
          headerTintColor: '#6372ff',
        }  
        }
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="InitialScreen" component={InitialScreen}/>
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen}/>
        <Stack.Screen name="InputCodeScreen" component={InputCodeScreen}/>
        <Stack.Screen name='RegisterScreen' component={RegisterScreen}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="EditChoferInfoScreen" component={EditChoferScreen}/>
        <Stack.Screen name="HomeChoferScreen" component={HomeChoferScreen}/>
        <Stack.Screen name ="HomeChofer" component={TabBar}/>
        <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen}/>
        {/* <Stack.Screen name="LoadDataScreen" component={LoadDataScreen}/> */}
        <Stack.Screen name="MisAutosScreen" component={MisAutosScreen} />
        <Stack.Screen name="NewPasswordForgotScreen" component={NewPasswordForgotScreen} />

      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
