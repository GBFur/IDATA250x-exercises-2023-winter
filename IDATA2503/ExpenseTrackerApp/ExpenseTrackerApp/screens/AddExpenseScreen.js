import React, { useState } from "react";
import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import PickerComponent from "../components/PickerComponent";
import DatePicker from "react-native-datepicker";

function AddExpenseScreen({ navigation }) {
  const [enteredExpenseText, setEnteredExpenseText] = useState("");
  const [enteredExpenseAmount, setEnteredExpenseAmount] = useState("");
  const [enteredExpenseTag, setEnteredExpenseTag] = useState("food");
  const [enteredExpenseDate, setEnteredExpenseDate] = useState(new Date());

  const addExpenseHandler = (expense) => {
    console.log("Saving expenese:", expense);
    navigation.navigate("ExpenseTracker", { newExpense: expense });
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
        <DatePicker
          date={enteredExpenseDate}
          onDateChange={(date) => setEnteredExpenseDate(date)}
        />
      </View>

      <View style={styles.actionContainer}>
        <View style={styles.pickerWrapper}>
          <PickerComponent onSelectTag={(tag) => setEnteredExpenseTag(tag)} />
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
