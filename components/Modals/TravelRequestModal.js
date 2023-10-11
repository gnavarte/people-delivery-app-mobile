import React from 'react';
import { View, Text, Button, Modal } from 'react-native';

const TravelRequestModal = ({ isVisible, username, location, onAccept, onDeny }) => {
  return (
    <Modal isVisible={isVisible}>
      <View>
        <Text>{`${username} ha solicitado un viaje a ${location}`}</Text>
        <Button title="Aceptar" onPress={onAccept} />
        <Button title="Denegar" onPress={onDeny} />
      </View>
    </Modal>
  );
};

export default TravelRequestModal;
