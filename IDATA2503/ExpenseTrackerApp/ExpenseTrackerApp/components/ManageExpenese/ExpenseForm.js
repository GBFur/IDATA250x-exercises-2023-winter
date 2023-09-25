import React, { useState } from "react";
import { Button, View, TextInput, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomTextInput from "../components/CustomTextInput";
import PickerComponent from "../components/PickerComponent";

function ExpanseForm({ onAddExpense, navigation }) {
  const [enteredExpenseText, setEnteredExpenseText] = useState("");
  const [enteredExpenseAmount, setEnteredExpenseAmount] = useState("");
  const [enteredExpenseTag, setEnteredExpenseTag] = useState("food");
  const [enteredExpenseDate, setEnteredExpenseDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onChange = ({ type }, selectedDate) => {
    const currentDate = selectedDate || enteredExpenseDate;
    if (type === "set") setEnteredExpenseDate(currentDate);
    toggleDatePicker();
  };

  return (
    <View style={styles.container}>
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
          placeholder="$Amount"
          textColor="#cccccccc"
          inputMode="numeric"
          keyboardType="decimal-pad"
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
                onAddExpense(newExpense);
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
    borderBottomWidth: 1,
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

export default ExpanseForm;
