import React from 'react';
import { StyleSheet, LogBox } from 'react-native';
LogBox.ignoreAllLogs();
import HomeScreen from './screens/HomeScreen';
import InitialScreen from './screens/InitialScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import InputCodeScreen from './screens/InputCodeScreen';
import RegisterScreen from './screens/RegisterScreen';
import DriverRegistrationScreen from './screens/DriverRegistrationScreen';
import InsuranceRegistrationScreen from './screens/InsuranceRegistrationScreen';
import VehicleRegistrationScreen from './screens/VehicleRegistrationScreen';
import LoginScreen from './screens/LoginScreen';
import EditChoferScreen from './screens/EditChoferScreen';
import HomeChoferScreen from './screens/HomeChoferScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import NewPasswordScreen from './screens/NewPasswordScreen';
import MisAutosScreen from './screens/MisAutosScreen';
import NewPasswordForgotScreen from './screens/NewPasswordForgotScreen';
import SupportScreen from './screens/SupportScreen';
import DriverPhotoScreen from './screens/DriverPhotoScreen';
import MainScreen from './screens/MainScreen';
import Lab from './screens/Lab';

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
        {/* <Stack.Screen name="Lab" component={Lab}/> */}
{/*         <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="InitialScreen" component={InitialScreen}/>
        <Stack.Screen name='RegisterScreen' component={RegisterScreen}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen}/>
        <Stack.Screen name="InputCodeScreen" component={InputCodeScreen}/>
        <Stack.Screen name="NewPasswordForgotScreen" component={NewPasswordForgotScreen} />
        <Stack.Screen name ="HomeChofer" component={TabBar} options={{headerShown:false}}/>
        <Stack.Screen name="DriverRegistrationScreen" component={DriverRegistrationScreen}/>
        <Stack.Screen name="VehicleRegistrationScreen" component={VehicleRegistrationScreen}/>
        <Stack.Screen name="InsuranceRegistrationScreen" component={InsuranceRegistrationScreen}/>
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="EditChoferInfoScreen" component={EditChoferScreen}/>
        <Stack.Screen name="HomeChoferScreen" component={HomeChoferScreen}/>
        <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen}/>
        <Stack.Screen name="MisAutosScreen" component={MisAutosScreen} />
        <Stack.Screen name="SupportScreen" component={SupportScreen} />
        <Stack.Screen name="DriverPhotoScreen" component={DriverPhotoScreen} /> */}
        <Stack.Screen name="MainScreen" component={MainScreen} />
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
