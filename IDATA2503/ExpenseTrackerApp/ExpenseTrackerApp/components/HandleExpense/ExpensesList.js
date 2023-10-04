import React from "react";
import { FlatList, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { TrashIcon } from "react-native-heroicons/outline";
import ExpenseItem from "./ExpenseItem";

function ExpensesList({ expenses, onExpenseDelete }) {

  const renderRightActions = () => {
    return (
      <View
        style={{
          backgroundColor: "red",
          width: "100%", // or any width you want to show when user swipes
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <TrashIcon color="white" size={24} />
      </View>
    );
  };

  return (
    <FlatList
      data={expenses}
      renderItem={(itemData) => (
        <Swipeable
          renderRightActions={() => renderRightActions()}
          onSwipeableOpen={() => onExpenseDelete(itemData.item.id)}
        >
          <ExpenseItem
            key={itemData.item.id}
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
