// src/screens/HomeScreen.js
import React, { useContext } from "react";
import { View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

function ExpenseTracker() {
  const expensesContext = useContext(ExpensesContext);

  return (

      <ExpensesOutput expenses={expensesContext.expenses} />

  );
}

export default ExpenseTracker;
