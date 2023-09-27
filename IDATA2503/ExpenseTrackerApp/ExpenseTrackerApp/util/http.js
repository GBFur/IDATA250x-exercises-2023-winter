import axios from "axios";

const BACKEND_URL =
  "https://expensetracker-ea0b0-default-rtdb.europe-west1.firebasedatabase.app";

//Stores the expense in the backend and returns the id of the stored expense
export async function storeExpense(expenseData) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
}

//Fetches all expenses from the backend and returns them as an array
export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObject = {
      id: key,
      text: response.data[key].text,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      tag: response.data[key].tag,
    };
    expenses.push(expenseObject);
  }

  return expenses;
}

//Deletes the expense with the given id in the backend
export async function deleteExpense(expenseId) {
  await axios.delete(BACKEND_URL + `/expenses/${expenseId}.json`);
}

//Undoes the deletion of the given expense in the backend
export async function undoDeleteExpense(expense) {
  const { id, ...data } = expense;
  await axios.put(`${BACKEND_URL}/expenses/${id}.json`, data);
}
