import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { ExpensesContext } from "../../store/expenses-context";
import {
  deleteExpense,
  fetchExpenses,
  undoDeleteExpense,
} from "../../util/http";
import CustomToast from "../Toast/CustomToast";
import ExpensesChart from "./ExpensesChart";
import ExpensesList from "./ExpensesList";

/**
 * Handles the output of the expenses list and chart
 */
function ExpensesOutput({ expenses }) {
  const expensesContext = useContext(ExpensesContext);
  const [hasDeleted, setHasDeleted] = useState(false);
  const [deletedExpenseId, setDeletedExpenseId] = useState(null);
  const toast = useToast();

  // fetch expenses from server
  useEffect(() => {
    async function getExpenses() {
      try {
        const fetchedExpenses = (await fetchExpenses()).reverse();
        expensesContext.setExpenses(fetchedExpenses);
      } catch (error) {
        console.error("Failed to fetch expenses", error);
      }
    }
    getExpenses();
  }, []);

  // show toast when expense is deleted
  useEffect(() => {
    if (hasDeleted) {
      toast.hideAll();
      toast.show(
        <CustomToast message={"undo delete"} onPress={undoDeleteHandler} />,
        {
          type: "danger",
          placement: "bottom",
          duration: 5000,
        }
      );
    }
  }, [hasDeleted, deletedExpenseId]);

  const undoDeleteHandler = () => {
    const lastDeletedExpense = expensesContext.lastDeletedExpense; // get last deleted expense

    undoDeleteExpense(lastDeletedExpense); // add back to server
    expensesContext.undoDelete(); // add back to context

    setHasDeleted(false);
    setDeletedExpenseId(null);
    toast.hideAll();
  };

  const onExpenseDelete = (id) => {
    expensesContext.deleteExpense(id); //delete from context
    deleteExpense(id); //delete from server
    setDeletedExpenseId(id);
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
