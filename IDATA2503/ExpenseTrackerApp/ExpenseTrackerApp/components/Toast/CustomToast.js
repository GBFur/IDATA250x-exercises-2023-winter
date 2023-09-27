import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomToast = ({ message, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{message}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
});

export default CustomToast;
