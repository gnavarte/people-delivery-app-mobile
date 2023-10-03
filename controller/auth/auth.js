import axios from 'axios';
// import API_BASE_URL from './apiConfig';
import { Alert } from 'react-native';

export const loginUser = async (email, password) => {
    try {
      const data = {
        email: email,
        password: password,
      };
  
      console.log(data)
      const response = await fetch(`${API_BASE_URL}/api/users/auths`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Origin': '*', 
        },
        body: JSON.stringify(data),
      });
  
      const datas = await response.json();
      console.log('Response from server:', datas);
      console.log('Response from server:', datas.token);
  
      switch(datas.status) {
        case 400:
          throw new Error('El email o contraseña utilizados son incorrectos');
      }
  
      return datas.token;
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('' + error);   
      throw new Error('An error occurred during login');
    }
  };