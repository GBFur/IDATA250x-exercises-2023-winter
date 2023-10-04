import { createContext, useReducer, useMemo } from "react";

/**
 * Context for storing expenses and functions for adding, deleting and undoing deletions.
 */
export const ExpensesContext = createContext({
  expenses: [],
  addExpense: () => {},
  setExpenses: () => {},
  deleteExpense: () => {},
  undoDelete: () => {},
  lastDeletedExpense: null,
});

/**
 * Reducer for expenses context. Handles adding, deleting and undoing deletions.
 */
function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [{ ...action.payload }, ...state.expenses],
      };

    case "SET_EXPENSES":
      return { ...state, expenses: action.payload.expenses };

    case "DELETE_EXPENSE": {
      const { id } = action.payload;
      const expenseIndex = state.expenses.findIndex(
        (expense) => expense.id === id
      );
      if (expenseIndex < 0) return state;

      const filteredExpenses = state.expenses.filter(
        (expense) => expense.id !== id
      );
      return {
        ...state,
        expenses: filteredExpenses,
        lastDeletedExpense: state.expenses[expenseIndex],
        lastDeletedIndex: expenseIndex,
      };
    }
    case "UNDO_DELETE":
      if (!state.lastDeletedExpense) return state;

      const expenses = [...state.expenses];
      expenses.splice(state.lastDeletedIndex, 0, state.lastDeletedExpense);
      return {
        ...state,
        expenses,
        lastDeletedExpense: null,
        lastDeletedIndex: null,
      };
    default:
      return state;
  }
}

/**
 * Context provider for expenses context. Provides expenses and functions for adding, deleting and undoing deletions.
 */

function ExpensesContextProvider({ children }) {
  const [state, dispatch] = useReducer(expensesReducer, { expenses: [] });

  const addExpense = (expense) =>
    dispatch({ type: "ADD_EXPENSE", payload: expense });
  const setExpenses = (expenses) =>
    dispatch({ type: "SET_EXPENSES", payload: { expenses } });
  const deleteExpense = (id) =>
    dispatch({ type: "DELETE_EXPENSE", payload: { id } });
  const undoDelete = () => dispatch({ type: "UNDO_DELETE" });

  //value for context provider 
  const value = useMemo(() => {
    return {
      ...state,
      addExpense,
      setExpenses,
      deleteExpense,
      undoDelete,
    };
  }, [state, addExpense, setExpenses, deleteExpense, undoDelete]);

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
