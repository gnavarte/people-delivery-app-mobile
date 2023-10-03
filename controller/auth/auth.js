import axios from 'axios';
import API_BASE_URL from "../api.js"
import { Alert } from 'react-native';

export const loginUser = async (email, password) => {
    try {
      const data = {
        email: email,
        password: password,
      };
  
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Origin': '*', 
        },
        body: JSON.stringify(data),
      });
  
      const datas = await response.json();  
      const token=datas.token;
      return token;
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('' + error);   
      throw new Error('An error occurred during login');
    }
  };

export const registerUser = async (nombre, apellido, direccion, fechaNacimiento, dni, telefono, email,password) => {
    try {
        const data = {
            firstName: nombre,
            lastName: apellido,
            address: direccion,
            dob: fechaNacimiento,
            dni: dni,
            phone: telefono,
            email: email,
            password: password,
        };
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
            method: 'POST',
            mode: 'cors',
            headers: {
            'Content-Type': 'application/json',
            'Origin': '*', 
            },
            body: JSON.stringify(data),
        });
        if (response.status===201){
            const datas = await response.json();
            return datas.token;
        }

    }
    catch (error) {
        console.error('Error during register:', error);
        Alert.alert('' + error);   
        throw new Error('An error occurred during register');
    }
};

export const updatePassword = async (email,actualPassword, newPassword) => {
    try {
        const data = {
            email: email,
            actualPassword: actualPassword,
            newPassword: newPassword,
        };
        const response = await fetch(`${API_BASE_URL}/api/auth/updatePwd`, {
            method: 'POST',
            mode: 'cors',
            headers: {
            'Content-Type': 'application/json',
            'Origin': '*', 
            },
            body: JSON.stringify(data),
        });
        if (response.status===200){
            return response.status;
        }
    }
    catch (error) {
        console.error('Error during register:', error);
        Alert.alert('' + error);   
        throw new Error('An error occurred during register');
    }
}
export const forgotPassword = async (email,newPassword) => {
    try {
        const data = {
            email: email,
            newPassword: newPassword,
        };
        const response = await fetch(`${API_BASE_URL}/api/auth/forgotPassword`, {
            method: 'POST',
            mode: 'cors',
            headers: {
            'Content-Type': 'application/json',
            'Origin': '*', 
            },
            body: JSON.stringify(data),
        });
        if (response.status===200){
            return response.status;
        }
    }
    catch (error) {
        console.error('Error during register:', error);
        Alert.alert('' + error);   
        throw new Error('An error occurred during register');
    }
}
