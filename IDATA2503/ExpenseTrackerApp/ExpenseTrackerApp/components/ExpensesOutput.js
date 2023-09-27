import React, { useEffect, useRef } from "react";
import { useContext, useState } from "react";
import { StyleSheet, View, Button, Animated } from "react-native";
import ExpensesChart from "./ExpensesChart";
import ExpensesList from "./ExpensesList";
import { ExpensesContext } from "../store/expenses-context";
import { deleteExpense, fetchExpenses, undoDeleteExpense } from "../util/http";
import { useToast } from "react-native-toast-notifications";
import CustomToast from "./Toast/CustomToast";

function ExpensesOutput({ expenses }) {
  const expensesContext = useContext(ExpensesContext);
  const [hasDeleted, setHasDeleted] = useState(false);
  const animateButton = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const [countdown, setCountdown] = useState(5);

  //TODO:
  //https://www.npmjs.com/package/react-native-toast-notifications

  //TODO:
  //ID is not updated when undoing delete (there is a new ID)

  // fetch expenses from server
  useEffect(() => {
    async function getExpenses() {
      const expenses = await fetchExpenses();
      expenses.reverse();
      expensesContext.setExpenses(expenses);
    }
    getExpenses();
  }, []);

  const toast = useToast();

  // show toast when expense is deleted
  useEffect(() => {
    if (hasDeleted) {
      toast.show(
        <CustomToast message={"undo delete"} onPress={undoDeleteHandler} />,
        {
          type: "danger",
          placement: "bottom",
          duration: 5000,
        }
      );
    }
  }, [hasDeleted]);

  const undoDeleteHandler = () => {
    const lastDeletedExpense = expensesContext.lastDeletedExpense; // get last deleted expense

    undoDeleteExpense(lastDeletedExpense); // add back to server
    expensesContext.undoDelete(); // add back to context

    setHasDeleted(false);
    toast.hideAll();
  };

  const onExpenseDelete = (id) => {
    expensesContext.deleteExpense(id); //delete from context
    deleteExpense(id); //delete from server
    setHasDeleted(true);
  };

  return (
    <View style={styles.container}>
      <View>
        {expenses.length > 0 && <ExpensesChart expenses={expenses} />}
      </View>
      <View style={styles.listContainer}>
        <ExpensesList expenses={expenses} onExpenseDelete={onExpenseDelete} />
      </View>
      <Animated.View
        style={{
          ...styles.buttonContainer,
          marginBottom: animateButton.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, 20], // animate from -50px to 0px from the bottom
          }),
        }}
      >
        <Button
          title={`Undo Delete ${countdown}`}
          onPress={undoDeleteHandler}
        />
      </Animated.View>
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  buttonContainer: {
    alignItems: "center",
  },
});
