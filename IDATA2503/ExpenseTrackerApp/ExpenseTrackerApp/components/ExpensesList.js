import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={(itemData) => (
        <ExpenseItem
          title={itemData.item.text}
          amount={itemData.item.amount}
          date={itemData.item.date}
          tag={itemData.item.tag}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
