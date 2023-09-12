import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { GlobalStyles } from "../constants/styles";

function ExpenseItem({ title, amount, date, tag }) {
  return (
    <View style={styles.expenseItem}>
      <Pressable
        android_ripple={{ color: "#ff0000" }}
        style={styles.rippleContainer}
      >
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.dateText}>{tag}</Text>
          <Text style={styles.dateText}>
            {new Date(date).toLocaleDateString()}
          </Text>
        </View>
        <Text style={styles.amountText}>${amount}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  expenseItem: {
    borderColor: GlobalStyles.colors.primary900,
    height: 80,
    justifyContent: "center",
    borderWidth: 2,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  titleText: {
    color: "white",
    fontSize: 20,
    paddingLeft: 24,
    fontWeight: "bold",
  },
  amountText: {
    color: "white",
    fontSize: 18,
    padding: 8,
    alignSelf: "flex-end",
  },
  dateText: {
    color: "white",
    fontSize: 14,
    padding: 8,
    marginLeft: "auto",
  },
  rippleContainer: {
    flex: 1,
  },
});

export default ExpenseItem;
