import React, { useEffect, useRef } from "react";
import { useContext, useState } from "react";
import { StyleSheet, View, Button, Animated } from "react-native";
import ExpensesChart from "./ExpensesChart";
import ExpensesList from "./ExpensesList";
import { ExpensesContext } from "../store/expenses-context";
import { deleteExpense, fetchExpenses, undoDeleteExpense } from "../util/http";

function ExpensesOutput({ expenses }) {
  const expensesContext = useContext(ExpensesContext);
  const [hasDeleted, setHasDeleted] = useState(false);
  const animateButton = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const [countdown, setCountdown] = useState(5);

  // fetch expenses from server
  useEffect(() => {
    async function getExpenses() {
      const expenses = await fetchExpenses();
      expenses.reverse();
      expensesContext.setExpenses(expenses);
    }
    getExpenses();
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      setTimeout(() => setCountdown(countdown - 1), 1000);
    }
  }, [countdown]);

  //todo: fix animation
  useEffect(() => {
    if (hasDeleted) {
      Animated.sequence([
        Animated.timing(animateButton, {
          toValue: 1,
          duration: 600, // 1 second to move to the animated position
          useNativeDriver: false,
        }),
        Animated.delay(5000), // Stay in the animated position for 4 seconds
        Animated.timing(animateButton, {
          toValue: 0,
          duration: 1000, // Immediately move back to the original position
          useNativeDriver: false,
        }),
      ]).start(() => setHasDeleted(false)); // reset hasDeleted after animation sequence
    }
  }, [hasDeleted]);

  const undoDeleteHandler = (id) => {
    const lastDeletedExpense = expensesContext.lastDeletedExpense; // get last deleted expense

    undoDeleteExpense(lastDeletedExpense); // add back to server
    expensesContext.undoDelete(id); // add back to context

    // trying to reset the animation (doesnt work)
    animateButton.stopAnimation();
    animateButton.resetAnimation();
    animateButton.setValue(0);
    setHasDeleted(false);
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
