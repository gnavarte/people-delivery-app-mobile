import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export const InitialScreen = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Welcome to the app</Text>
        <Text style={styles.subtitle}>Please login or register</Text>
        <View style={styles.buttonsContainer}>
            <Button
            title="Login"
            onPress={() => {
                console.log('Login');
            }}
            />
            <Button
            title="Register"
            onPress={() => {
                console.log('Register');
            }}
            />
        </View>
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
