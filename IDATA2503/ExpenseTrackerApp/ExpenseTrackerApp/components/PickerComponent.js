import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { GlobalStyles } from "../constants/styles";

function PickerComponent({ onValueChange }) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleValueChange = (value) => {
    setSelectedValue(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <Picker
      dropdownIconRippleColor={GlobalStyles.colors.primary600}
      dropdownIconColor="white"
      selectedValue={selectedValue}
      style={styles.picker}
      onValueChange={(itemValue) => handleValueChange(itemValue)}
    >
      <Picker.Item label="Food" value="food" />
      <Picker.Item label="Travel" value="travel" />
      <Picker.Item label="Leisure" value="leisure" />
      <Picker.Item label="Work" value="work" />
    </Picker>
  );
}

const styles = StyleSheet.create({
  picker: {
    width: "100%",
    color: "white",
  },
});

export default PickerComponent;
