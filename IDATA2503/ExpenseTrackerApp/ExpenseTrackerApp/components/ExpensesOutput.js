import { View } from "react-native";
import ExpensesList from "./ExpensesList";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date("2023-07-14"),
  },
  {
    id: "e2",
    title: "new tv",
    amount: 48.22,
    date: new Date("2023-04-14"),
  },
  {
    id: "e3",
    title: "A book",
    amount: 50.32,
    date: new Date("2023-06-14"),
  },
];

function ExpensesOutput({ expenses }) {
  return (
    <View>
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

export default ExpensesOutput;
