import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

/**
 * Custom toast component for displaying a message
 */
const CustomToast = ({ message, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{message}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
});

export default CustomToast;
