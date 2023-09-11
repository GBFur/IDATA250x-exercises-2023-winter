import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

function ExpenseItem({ title, amount, date }) {
  return (
    <View style={styles.expenseItem}>
      <Pressable
        android_ripple={{ color: "#ff0000" }}
        style={styles.rippleContainer}
      >
        <Text style={styles.expenseText}>
          {title} - ${amount} on {date.toString()}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  expenseItem: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 4,
  },
  expenseText: {
    color: "white",
    fontSize: 16,
    padding: 8,
  },
});

export default ExpenseItem;
