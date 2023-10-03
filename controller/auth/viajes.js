import axios from 'axios';
import API_BASE_URL from "../api.js"
import { Alert } from 'react-native';

export const getViajes = async (email) => {
    try {
        const data = {
            email: email,
        };
        const response = await fetch(`${API_BASE_URL}/api/viajes`, {
            method: 'POST',
            mode: 'cors',
            headers: {
            'Content-Type': 'application/json',
            'Origin': '*', 
            },
            body: JSON.stringify(data),
        });
        const datas = await response.json();
        return datas;
    }
    catch (error) {
        console.error('Error during register:', error);
        Alert.alert('' + error);   
        throw new Error('An error occurred during register');
    }
}
