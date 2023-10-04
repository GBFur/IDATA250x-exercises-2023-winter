import React, { useContext } from "react";
import { View } from "react-native";
import ExpenseForm from "../components/AddExpense/ExpenseForm";
import { ExpensesContext } from "../store/expenses-context";

/**
 * Screen for adding an expense to the list
 * Uses the ExpenseForm component to render the form
 *
 * Comment from author:
 * Might be better to just use the ExpenseForm component directly in App.js
 * as this only renders the form and nothing else
 */
function AddExpenseScreen({ navigation }) {
  const { addExpense } = useContext(ExpensesContext);

  const addExpenseHandler = (newExpense) => {
    addExpense(newExpense);
    navigation.reset({
      index: 0,
      routes: [{ name: "ExpenseScreen" }],
    });
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 8,
      }}
    >
      <ExpenseForm onAddExpense={addExpenseHandler} navigation={navigation} />
    </View>
  );
}

export default AddExpenseScreen;
