import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Button, StatusBar, StyleSheet, TextInput, View } from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import PickerComponent from "../components/PickerComponent";

function AddExpenseScreen({ navigation, onAddExpense }) {
  const [enteredExpenseText, setEnteredExpenseText] = useState("");
  const [enteredExpenseAmount, setEnteredExpenseAmount] = useState("");
  const [enteredExpenseTag, setEnteredExpenseTag] = useState("");
  const [enteredExpenseDate, setEnteredExpenseDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const storeData = async (newExpense) => {
    try {
      const existingExpenses = await AsyncStorage.getItem(
        "@MySuperStore:expenses"
      );
      const expenses = existingExpenses ? JSON.parse(existingExpenses) : [];
      expenses.push(newExpense);
      console.log(newExpense);

      await AsyncStorage.setItem(
        "@MySuperStore:expenses",
        JSON.stringify(expenses)
      );
      navigation.reset({
        index: 0,
        routes: [{ name: "ExpenseTracker" }],
      });
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  const toggleDatePicker = () => {
    console.log("hello");
    setShowDatePicker(!showDatePicker);
  };

  const onChange = ({ type }, selectedDate) => {
    const currentDate = selectedDate || enteredExpenseDate;

    if (type === "set") {
      setEnteredExpenseDate(currentDate);
    }

    toggleDatePicker(); // Close the date picker whether canceled or set
  };

  const addExpenseHandler = (newExpense) => {
    storeData(newExpense);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.inputWrapper}>
        <CustomTextInput
          style={styles.textInput}
          placeholder="Custom Daily groceries"
          textColor="#cccccccc"
          inputMode="text"
          onChangeText={setEnteredExpenseText}
        />
      </View>

      <View style={styles.rowWrapper}>
        <CustomTextInput
          style={styles.expenseAmount}
          placeholder="$ Amount"
          textColor="#cccccccc"
          inputMode="numeric"
          onChangeText={setEnteredExpenseAmount}
        />

        <TextInput
          style={[styles.textInput, { width: "50%" }]}
          placeholder="Date"
          onPressIn={toggleDatePicker}
          value={enteredExpenseDate.toLocaleDateString()}
        />

        {showDatePicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={enteredExpenseDate}
            onChange={onChange}
          />
        )}
      </View>

      <View style={styles.actionContainer}>
        <View style={styles.pickerWrapper}>
          <PickerComponent onValueChange={(tag) => setEnteredExpenseTag(tag)} />
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <Button
              title="Cancel"
              style={styles.button}
              onPress={() => {
                navigation.navigate("ExpenseTracker");
              }}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Save Expense"
              onPress={() => {
                const newExpense = {
                  text: enteredExpenseText,
                  amount: enteredExpenseAmount,
                  tag: enteredExpenseTag,
                  date: enteredExpenseDate,
                };
                addExpenseHandler(newExpense);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#09090b",
    flex: 1,
    paddingTop: 24,
    padding: 8,
  },
  textInput: {
    borderColor: "#cccccc",
    color: "white",
    borderBottomWidth: 1,
    width: "100%",
    marginRight: 4,
    padding: 4,
  },
  expenseAmount: {
    borderColor: "#cccccc",
    borderBottomWidth: 1,
    width: "20%",
    marginRight: 4,
    padding: 4,
  },
  rowWrapper: {
    paddingTop: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 32,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickerWrapper: {
    minWidth: "40%",
    width: "20%",
    borderColor: "#cccccc",
    borderWidth: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 8,
  },
  button: {
    margin: 8,
  },
});

export default AddExpenseScreen;
