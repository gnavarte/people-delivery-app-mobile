import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet ,Dimensions} from 'react-native';

export const PrimaryButton = ({ title, onPress, backgroundColor }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, { backgroundColor }]}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%',
    marginTop: 20,
    borderRadius: 30,
    width: 279,
    alignSelf: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: Dimensions.get('window').width*0.05,
  },
});

export default PrimaryButton;
