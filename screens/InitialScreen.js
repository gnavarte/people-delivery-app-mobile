import React from 'react';
import { View, Text, Button, StyleSheet,Dimensions } from 'react-native';
import { PrimaryButton } from '../components/Buttons/Button';
import TextInputBlack from '../components/TextInputCustomized';
export const InitialScreen = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Welcome to the app</Text>
        <Text style={styles.subtitle}>Please login or register</Text>
        <View style={styles.buttonsContainer}>
            <PrimaryButton title="Login" onPress={() => alert('Login')} />
            <PrimaryButton title="Register" onPress={() => alert('Register')} />
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
export default InitialScreen;