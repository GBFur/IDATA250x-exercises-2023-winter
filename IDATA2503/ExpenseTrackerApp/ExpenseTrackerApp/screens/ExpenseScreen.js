// src/screens/HomeScreen.js
import React, { useContext } from "react";
import ExpensesOutput from "../components/HandleExpense/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

/**
 * Screen for displaying the list of expenses
 * Uses the ExpensesOutput component to render the list and chart
 *
 * Comment from author:
 * Might be better to just use the ExpensesOutput component directly in App.js
 * as this only renders the list and nothing else
 */
function ExpenseScreen() {
  const expensesContext = useContext(ExpensesContext);

  return <ExpensesOutput expenses={expensesContext.expenses} />;
}

export default ExpenseScreen;
