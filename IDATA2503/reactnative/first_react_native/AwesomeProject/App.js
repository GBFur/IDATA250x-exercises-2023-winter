import React, { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

export default function App() {
  const [coarseGoals, setCoarseGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function cancelAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    setCoarseGoals((currentGoals) => [
      ...currentGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
  }

  function deleteGoalHandler(id) {
    setCoarseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <View style={styles.appContainer}>
      <Button
        title="Add New Goal"
        onPress={startAddGoalHandler}
        color="#3b82f6"
      />
      <GoalInput
        onCancel={cancelAddGoalHandler}
        visible={modalIsVisible}
        onAddGoal={addGoalHandler}
      />
      <View style={styles.goalsContainer}>
        <FlatList
          data={coarseGoals}
          renderItem={(itemData) => {
            return (
              <GoalItem
                text={itemData.item}
                onDeleteItem={deleteGoalHandler}
                id={itemData.id}
              />
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#cccccc",
    paddingBottom: 8,
  },

  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 4,
    padding: 4,
  },

  goalsContainer: {
    marginTop: 16,
    flex: 6,
  },

  goalItemText: {
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    padding: 4,
    marginVertical: 4,
  },
});
