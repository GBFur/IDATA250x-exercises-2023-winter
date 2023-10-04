import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import CustomTextInput from "./CustomTextInput";
import { storeExpense } from "../../util/http";
import PickerComponent from "./PickerComponent";

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

  async function saveExpenseHandler() {
    const newExpense = {
      text: enteredExpenseText,
      amount: enteredExpenseAmount,
      tag: enteredExpenseTag,
      date: enteredExpenseDate,
    };

    const amountIsValid = !isNaN(newExpense.amount) && newExpense.amount > 0;
    const textIsValid = newExpense.text.trim().length > 0;

    if (!amountIsValid || !textIsValid) {
      Alert.alert("Invalid input", "Please check your input values");
      return;
    }
    const id = await storeExpense(newExpense);
    onAddExpense({ ...newExpense, id: id });
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <CustomTextInput
          style={styles.textInput}
          placeholder="Expense description"
          textColor="#cccccccc"
          inputMode="text"
          onChangeText={setEnteredExpenseText}
          prefix="Title"
        />
      </View>

      <View style={styles.rowWrapper}>
        <Text style={{ color: "white", marginTop: 9 }}>$</Text>
        <CustomTextInput
          style={styles.expenseAmount}
          placeholder="Amount"
          textColor="#cccccccc"
          inputMode="numeric"
          keyboardType="decimal-pad"
          onChangeText={setEnteredExpenseAmount}
        />

        <TextInput
          style={[styles.textInput, { width: "48%" }]}
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
            <Button title="Save Expense" onPress={saveExpenseHandler} />
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
    marginLeft: 5,
  },
  expenseAmount: {
    borderColor: "#cccccc",
    width: "50%",
    borderBottomWidth: 1,
    marginRight: 4,
    padding: 4,
  },
  rowWrapper: {
    paddingTop: 32,
    flexDirection: "row",
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
