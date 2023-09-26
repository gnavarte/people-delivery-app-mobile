import React from 'react';
import { TextInput, View, Button } from 'react-native';

const InputSupport = ({
  onChangeText={onChangeText},
  value={value},
  placeholder,
  backgroundColor,
  placeholderTextColor,
}) => {
  return (
    <View>
      <TextInput
        style={{
          height: 200,
          borderColor: 'gray',
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          backgroundColor: backgroundColor || 'white',
          color: 'black',
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 8,
          textAlign: 'left',
          textAlignVertical: 'top',
        }}
        multiline={true}
        placeholder={placeholder || 'Escribe tu consulta aquí'}
        placeholderTextColor={placeholderTextColor || 'gray'}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default InputSupport;
