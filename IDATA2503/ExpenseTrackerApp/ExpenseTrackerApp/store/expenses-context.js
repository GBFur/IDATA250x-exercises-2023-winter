import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ text, amount, date, tag }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { text, amount, date, tag }) => {},
  undoDelete: () => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD_EXPENSE": {
      const id = new Date().toString() + Math.random().toString();
      const newExpense = {
        id: id,
        text: action.payload.text,
        amount: action.payload.amount,
        date: action.payload.date,
        tag: action.payload.tag,
      };
      return {
        ...state,
        expenses: state.expenses.concat(newExpense),
      };
    }
    case "DELETE_EXPENSE": {
      const expenseToDelete = state.expenses.find(
        (expense) => expense.id === action.payload.id
      );
      if (!expenseToDelete) return state; 

      const filteredExpenses = state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      );
      return {
        ...state,
        expenses: filteredExpenses,
        lastDeletedExpense: expenseToDelete,
      };
    }
    case "UNDO_DELETE": {
      if (!state.lastDeletedExpense) return state; 

      return {
        ...state,
        expenses: state.expenses.concat(state.lastDeletedExpense),
        lastDeletedExpense: null,
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
    addExpense: addExpenseHandler,
    deleteExpense: deleteExpenseHandler,
    updateExpense: updateExpenseHandler,
    undoDelete: undoDeleteHandler,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
