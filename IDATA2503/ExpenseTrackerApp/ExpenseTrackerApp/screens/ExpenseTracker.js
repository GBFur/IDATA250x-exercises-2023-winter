// src/screens/HomeScreen.js
import React from "react";
import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";

function ExpenseTracker({ navigation }) {
  return <ExpensesOutput />;
}

const styles = StyleSheet.create({
  container: {
    padding: 8,

    flex: 1,
  },
});

export default ExpenseTracker;
