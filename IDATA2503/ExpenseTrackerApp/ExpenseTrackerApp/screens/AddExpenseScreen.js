import React, { useContext } from "react";
import { StatusBar, View } from "react-native";
import ExpenseForm from "../components/ManageExpenese/ExpenseForm";
import { ExpensesContext } from "../store/expenses-context"; // Please replace with your actual path

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
      <StatusBar style="auto" />
      <ExpenseForm onAddExpense={addExpenseHandler} navigation={navigation} />
    </View>
  );
}

export default AddExpenseScreen;
