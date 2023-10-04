import React from "react";
import { StyleSheet, TextInput } from "react-native";

/**
 Reusable text input component
 */
function CustomTextInput(props) {
  return (
    <TextInput
      style={[props.style, styles.textInput]}
      placeholder={props.placeholder}
      placeholderTextColor={props.textColor}
      inputMode={props.inputMode}
      keyboardType={props.keyboardType}
      onChangeText={props.onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    color: "white",
  },
});

export default CustomTextInput;
