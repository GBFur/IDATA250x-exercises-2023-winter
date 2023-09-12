// src/screens/HomeScreen.js
import React from "react";
import { StyleSheet, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";

function ExpenseTracker({ navigation }) {
  return (
    <View>
      <ExpensesOutput />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,

    flex: 1,
  },
});

export default ExpenseTracker;
