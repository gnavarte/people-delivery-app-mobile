import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export const PrimaryButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#467fd3',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        width: '100%',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
