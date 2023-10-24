import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

function IconButton({ icon, color, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onPress}
    >
      <MaterialIcons name={icon} size={24} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
});

export default IconButton;
