import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

function ExpenseItem({ title, amount, date, tag }) {
  return (
    <View style={styles.expenseItem}>
      <View style={styles.textContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <Text style={styles.dateText}>{tag}</Text>
        <View style={styles.rightContainer}>
          <Text style={styles.amountText}>${amount}</Text>
          <Text style={styles.dateText}>
            {new Date(date).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  expenseItem: {
    borderColor: GlobalStyles.colors.primary900,
    flex: 1,
    borderWidth: 2,
    marginVertical: 5,
    flexDirection: "row",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    alignContent: "center",
    width: "70%",
  },
  rightContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    width: "20%",
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
    justifyContent: "center",
    marginLeft: "auto",
  },
  rippleContainer: {
    flex: 1,
  },
});

export default ExpenseItem;
