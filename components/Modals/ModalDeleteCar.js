import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import PrimaryButton from '../Buttons/Button';
import { Dimensions } from 'react-native';

const ModalDeleteCar = ({ showModal, onClose, onConfirm }) => {
  return (
    <Modal visible={showModal} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>¿Está seguro que desea eliminar el auto?</Text>

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButton} onPress={onConfirm}>
              <PrimaryButton title="ELIMINAR AUTO" onPress={onConfirm} backgroundColor="#000000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButtonC} onPress={onClose}>
              <PrimaryButton title="CANCELAR" onPress={onClose} backgroundColor="#D9D9D9" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: Dimensions.get('window').width * 0.04,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'column', 
    width: '100%',
  },
  modalButton: {
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10, 
  },
  modalButtonC: {
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
};

export default ModalDeleteCar;
