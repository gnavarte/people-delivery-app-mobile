import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
<<<<<<< HEAD
import { PrimaryButton } from '../components/PrimaryButton';

=======
import TextInputBlack from '../components/TextInputBlack';
>>>>>>> a5087c2be99a431da08404cb1ce7e2f3929d5326
export const InitialScreen = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Welcome to the app</Text>
        <Text style={styles.subtitle}>Please login or register</Text>
        <View style={styles.buttonsContainer}>
<<<<<<< HEAD
            <PrimaryButton title="Login" onPress={() => alert('Login')} />
            <PrimaryButton title="Register" onPress={() => alert('Register')} />
=======
            <Button
            title="Login"
            onPress={() => {
                console.log('Login');
            }}
            />
            <Button
            title="Registessr"
            onPress={() => {
                console.log('Registessr');
            }}
            />

            
>>>>>>> a5087c2be99a431da08404cb1ce7e2f3929d5326
        </View>
        <TextInputBlack placeholder="Email" />
        </View>
        
    );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
    fontSize: 24,
    fontWeight: 'bold',
    },
    subtitle: {
    fontSize: 18,
    },
    buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    },
});
