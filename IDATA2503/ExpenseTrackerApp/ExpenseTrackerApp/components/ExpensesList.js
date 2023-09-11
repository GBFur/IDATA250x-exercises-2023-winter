import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={(itemData) => (
        <ExpenseItem
          title={itemData.item.title}
          amount={itemData.item.amount}
          date={itemData.item.date}
        />
      )}
    />
  );
}

export default ExpensesList;
