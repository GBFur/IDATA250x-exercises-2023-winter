import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ text, amount, date, tag }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { text, amount, date, tag }) => {},
  undoDelete: () => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD_EXPENSE": {
      const newExpense = {
        id: action.payload.id,
        text: action.payload.text,
        amount: action.payload.amount,
        date: action.payload.date,
        tag: action.payload.tag,
      };
      return {
        ...state,
        expenses: [newExpense, ...state.expenses],
      };
    }

    case "SET_EXPENSES": {
      return action.payload;
    }

    case "DELETE_EXPENSE": {
      const expenseIndex = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (expenseIndex < 0) return state;

      const expenseToDelete = state.expenses[expenseIndex];
      const filteredExpenses = state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      );
      return {
        ...state,
        expenses: filteredExpenses,
        lastDeletedExpense: expenseToDelete,
        lastDeletedIndex: expenseIndex, // Store the index of the deleted expense
      };
    }
    case "UNDO_DELETE": {
      if (!state.lastDeletedExpense) return state;

      const expenses = [...state.expenses];
      expenses.splice(state.lastDeletedIndex, 0, state.lastDeletedExpense);

      return {
        ...state,
        expenses: expenses,
        lastDeletedExpense: null,
        lastDeletedExpenseIndex: null,
      };
    }
    case "UPDATE_EXPENSE": {
      const expenseIndex = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (expenseIndex < 0) return state; // Expense not found

      const updatedExpenses = [...state.expenses];
      updatedExpenses[expenseIndex] = {
        ...updatedExpenses[expenseIndex],
        ...action.payload,
      };
      return {
        ...state,
        expenses: updatedExpenses,
      };
    }
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const initialState = {
    expenses: [],
    deletedExpenses: null,
  };
  const [expenseState, dispatch] = useReducer(expensesReducer, initialState);

  function addExpenseHandler({ text, amount, date, tag }) {
    dispatch({
      type: "ADD_EXPENSE",
      payload: {
        text,
        amount,
        date,
        tag,
      },
    });
  }

  function setExpenses(expenses) {
    dispatch({
      type: "SET_EXPENSES",
      payload: {
        expenses,
      },
    });
  }

  function deleteExpenseHandler(id) {
    dispatch({
      type: "DELETE_EXPENSE",
      payload: {
        id,
      },
    });
  }

  function undoDeleteHandler() {
    dispatch({ type: "UNDO_DELETE" });
  }

  function updateExpenseHandler(id, { text, amount, date, tag }) {
    dispatch({
      type: "UPDATE_EXPENSE",
      payload: {
        id,
        text,
        amount,
        date,
        tag,
      },
    });
  }

  const value = {
    expenses: expenseState.expenses,
    setExpenses: setExpenses,
    addExpense: addExpenseHandler,
    deleteExpense: deleteExpenseHandler,
    updateExpense: updateExpenseHandler,
    undoDelete: undoDeleteHandler,
    lastDeletedExpense: expenseState.lastDeletedExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
