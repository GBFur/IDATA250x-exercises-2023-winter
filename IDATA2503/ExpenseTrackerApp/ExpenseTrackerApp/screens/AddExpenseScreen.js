import React, { useContext } from "react";
import { StatusBar, View } from "react-native";
import ExpenseForm from "../components/AddExpense/ExpenseForm";
import { ExpensesContext } from "../store/expenses-context";

function AddExpenseScreen({ navigation }) {
  const { addExpense } = useContext(ExpensesContext);

  const addExpenseHandler = (newExpense) => {
    addExpense(newExpense);
    navigation.reset({
      index: 0,
      routes: [{ name: "ExpenseTracker" }],
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#09090b",
        paddingTop: 24,
        padding: 8,
      }}
    >
      <ExpenseForm onAddExpense={addExpenseHandler} navigation={navigation} />
    </View>
  );
}

export default AddExpenseScreen;
