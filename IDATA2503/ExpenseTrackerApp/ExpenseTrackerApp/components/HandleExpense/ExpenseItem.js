import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

/**
 * ExpenseItem component for displaying an expense
 */
function ExpenseItem({ title, amount, date, tag }) {
  return (
    <View style={styles.expenseItem}>
      <View style={styles.leftContainer}>
        <Text style={styles.titleText} numberOfLines={2}>{title}</Text>
        <Text style={styles.tagText}>{tag}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.amountText}>${amount}</Text>
        <Text style={styles.dateText}>
          {new Date(date).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  expenseItem: {
    backgroundColor: GlobalStyles.colors.primary950,
    borderColor: GlobalStyles.colors.primary900,
    flex: 1,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  leftContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "70%",
  },
  rightContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "30%",
  },
  titleText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    flexWrap: 'wrap',
  },
  tagText: {
    color: "white",
    fontSize: 14,
  },
  amountText: {
    color: "white",
    fontSize: 18,
  },
  dateText: {
    color: "white",
    fontSize: 14,
  },
});

export default ExpenseItem;
