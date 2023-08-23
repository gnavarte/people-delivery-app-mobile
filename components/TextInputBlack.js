import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const TextInputBlack = ({ placeholder, icon }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="black"
      />
      {/* {icon && <View style={styles.iconContainer}>{icon}</View>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    paddingHorizontal: 12,
    textAlign: 'center',
    width: '80%',
  },
  input: {
    flex: 1,
    color: 'black',
    textAlign: 'center',

  },
  iconContainer: {
    marginLeft: 8,
  },
});

export default TextInputBlack;
