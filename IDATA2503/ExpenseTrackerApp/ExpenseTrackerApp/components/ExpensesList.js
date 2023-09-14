import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import ExpenseItem from "./ExpenseItem";
import { Swipeable } from "react-native-gesture-handler";

function ExpensesList({ expenses }) {
  const deleteItem = (id) => {
    //delete item from state
  };

  const renderRightActions = (item) => {
    return (
      <TouchableOpacity
        onPress={() => deleteItem(item.id)}
        style={{
          backgroundColor: "red",
          justifyContent: "center",
          alignItems: "flex-end",
          flex: 1,
          padding: 20,
        }}
      >
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={expenses}
      renderItem={(itemData) => (
        <Swipeable renderRightActions={() => renderRightActions(itemData.item)}>
          <ExpenseItem
            title={itemData.item.text}
            amount={itemData.item.amount}
            date={itemData.item.date}
            tag={itemData.item.tag}
          />
        </Swipeable>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
