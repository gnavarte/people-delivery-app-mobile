import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const TextInputCustomized = ({ placeholder, icon , backgroundColor ,placeholderTextColor}) => {
  return (
    <View style={[styles.container, { backgroundColor}]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
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
    height:'12%',
  },
  input: {
    flex: 1,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Roboto',

  },
  iconContainer: {
    marginLeft: 8,
  },
});

export default TextInputCustomized;
