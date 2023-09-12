import ExpensesList from "./ExpensesList";
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

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

useFocusEffect(
  React.useCallback(() => {
    _retrieveData();
  }, [])
);

  return (
    <View>
      <ExpensesList expenses={expenses} />
    </View>
  );
}

export default ExpensesOutput;
