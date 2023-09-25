import React from "react";
import { StatusBar, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExpanseForm from "../components/ManageExpenese/ExpenseForm";

function AddExpenseScreen({ navigation }) {
  const storeData = async (newExpense) => {
    try {
      const existingExpenses = await AsyncStorage.getItem("@MySuperStore:expenses");
      const expenses = existingExpenses ? JSON.parse(existingExpenses) : [];
      expenses.push(newExpense);

      await AsyncStorage.setItem("@MySuperStore:expenses", JSON.stringify(expenses));
      navigation.reset({
        index: 0,
        routes: [{ name: "ExpenseTracker" }],
      });
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  const addExpenseHandler = (newExpense) => {
    storeData(newExpense);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#09090b", paddingTop: 24, padding: 8 }}>
      <StatusBar style="auto" />
      <ExpanseForm onAddExpense={addExpenseHandler} navigation={navigation} />
    </View>
  );
}

export default AddExpenseScreen;
