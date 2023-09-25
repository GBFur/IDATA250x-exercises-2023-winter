import ExpensesList from "./ExpensesList";
import React, { useState, useEffect } from "react";
import { View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import ExpensesChart from "./ExpensesChart";

function ExpensesOutput() {
  const [expenses, setExpenses] = useState([]);

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@MySuperStore:expenses");
      if (value !== null) {
        setExpenses(JSON.parse(value));
      }
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      setExpenses([]); // Clearing the local state as well
    } catch (error) {
      console.error("Error clearing AsyncStorage: ", error);
    }
  };

  const handleDeleteExpense = (id) => {
    const filteredExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(filteredExpenses);
    storeData(filteredExpenses);
  };

  useFocusEffect(
    React.useCallback(() => {
      _retrieveData();
    }, [])
  );

  const storeData = async (updatedExpenses) => {
    try {
      await AsyncStorage.setItem("@MySuperStore:expenses", JSON.stringify(updatedExpenses));
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };

  return (
    <View>
      <View>
        <Button title="clear (DEMO)" onPress={clearAsyncStorage} />
        {expenses.length > 0 && <ExpensesChart expenses={expenses} />}
      </View>
      <View>
        <ExpensesList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
      </View>
    </View>
  );
}

export default ExpensesOutput;
