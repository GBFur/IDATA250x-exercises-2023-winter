import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

/**
 * Picker component for selecting the tag of an expense
 * uses react-native-picker
 */
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
    padding: 4, // To match other input fields
  },
});

export default PickerComponent;
