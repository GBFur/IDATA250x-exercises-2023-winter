// src/screens/HomeScreen.js
import React from "react";
import { StyleSheet, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";

function HomeScreen({ navigation }) {
  return <ExpensesOutput />;
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: "#09090b",
    flex: 1,
  },
});

export default HomeScreen;
