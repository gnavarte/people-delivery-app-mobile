import React, { useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({ selectedDate, onDateChange, placeholder }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      onDateChange(date);
    }
  };

  const dateTextColor = selectedDate ? "#000000" : "#aaaaaa";

  return (
    <View>
      <TouchableOpacity onPress={toggleDatePicker} style={styles.dateInput}>
        <Text style={[styles.dateText, { color: dateTextColor }]}>
          {selectedDate ? selectedDate.toDateString() : placeholder}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate || new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dateInput: {
    backgroundColor: "#ffffff",
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 10,
    paddingLeft: 16,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: '#7F44C2',
  },
  dateText: {
    color: "black",
  },
});

export default DatePicker;
