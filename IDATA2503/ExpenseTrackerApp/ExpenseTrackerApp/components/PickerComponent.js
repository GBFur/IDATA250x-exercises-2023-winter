import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

function PickerComponent({ onValueChange }) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleValueChange = (value) => {
    setSelectedValue(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <View style={styles.pickerWrapper}>
      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={(itemValue) => handleValueChange(itemValue)}
      >
        <Picker.Item label="Food" value="food" />
        <Picker.Item label="Travel" value="travel" />
        <Picker.Item label="Leisure" value="leisure" />
        <Picker.Item label="Work" value="work" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerWrapper: {
    borderColor: "#cccccc",
    borderWidth: 1,
  },
  picker: {
    width: "100%",
    color: "#cccccc",
  },
});

export default PickerComponent;
