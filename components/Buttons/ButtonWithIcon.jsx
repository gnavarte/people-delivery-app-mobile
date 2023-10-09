import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';

export const ButtonWithIcon = ({ title, icon, backgroundColor, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, { backgroundColor }]}>
        <View style={styles.iconContainer}>
          <Image source={icon} style={styles.icon} resizeMode="contain" />
        </View>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: Dimensions.get('window').width * 0.7, 
    height: 60, 
    marginTop: 20,
    borderRadius: 30,
    alignSelf: 'center',
  },
  iconContainer: {
    width: '15%', 
    aspectRatio: 1, 
    marginRight: 10,
  },
  icon: {
    flex: 1, 
    width: undefined,
    height: undefined,
  },
  buttonText: {
    color: '#fff',
    fontSize: Dimensions.get('window').width * 0.05,
  },
});

export default ButtonWithIcon;



