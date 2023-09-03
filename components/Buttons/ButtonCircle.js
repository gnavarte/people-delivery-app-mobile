import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert ,Dimensions} from 'react-native';

class BotonCircular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      encendido: false,
    };
  }

  handlePress = () => {
    const { encendido } = this.state;

    if (!encendido) {
      Alert.alert(
        '¿Estás seguro?',
        '¿Deseas encender?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Encender',
            onPress: () => {
              this.setState({ encendido: true });
              if (this.props.onPress) {
                this.props.onPress(true); 
              }
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        '¿Estás seguro?',
        '¿Deseas apagar?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Apagar',
            onPress: () => {
              this.setState({ encendido: false });
              if (this.props.onPress) {
                this.props.onPress(false);
              }
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  render() {
    const { encendido } = this.state;
    const backgroundColor = encendido ? 'red' : this.props.backgroundColor || '#5985EB';
    const texto = encendido ? 'Apagar' : 'Iniciar';
    
    return (
      <TouchableOpacity
        style={[styles.boton, { backgroundColor }]}
        onPress={this.handlePress}
      >
        <Text style={styles.texto}>{texto}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  boton: {
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    color: 'white',
    fontSize: Dimensions.get('window').width*0.05,
  },
});

export default BotonCircular;
