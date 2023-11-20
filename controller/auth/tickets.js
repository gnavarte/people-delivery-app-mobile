import axios from 'axios';
import API_BASE_URL from "../api.js"
import { Alert } from 'react-native';

export const getTickets = async (email) => {
    try {
        const data = {
            idSolicitante: email,
        };
        const response = await fetch(`${API_BASE_URL}/api/ticket/getTickets`, {
            method: 'POST',
            mode: 'cors',
            headers: {
            'Content-Type': 'application/json',
            'Origin': '*', 
            },
            body: JSON.stringify(data),
        });
        console.log("######")
        const datas = await response.json();
        return datas;
    }
    catch (error) {
        console.error('Error during register:', error);
        Alert.alert('' + error);   
        throw new Error('An error occurred during register');
    }
}
export const createTicket = async (props) => {
    try{
        const data =props
        console.log('##########')
        console.log(data)
        const response = await fetch(`${API_BASE_URL}/api/ticket/newTicket}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
            'Content-Type': 'application/json',
            'Origin': '*', 
            },
            body: JSON.stringify(data),
        });
        console.log('######')
        console.log(response)
        if (response.status===200){
            return response.status;
        }
    }
    catch (error) {
        console.error('Error during creating ticket:', error);
        Alert.alert('' + error);   
        throw new Error('An error occurred during creating ticket');
    }
}
