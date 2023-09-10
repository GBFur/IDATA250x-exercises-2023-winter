import { StyleSheet, View, Text, Pressable, Alert } from "react-native";

function GoalItem({ text, onDeleteItem }) {
  const handleAlert = () => {
    Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
      {
        text: "Delete",
        onPress: () => onDeleteItem(text.id),
      },
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
    ]);
  };

  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#ff0000" }}
        onLongPress={handleAlert}
        style={styles.rippleContainer}
      >
        <Text style={styles.goalText}>{text.text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    backgroundColor: "#09090b",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 4,
  },

  goalText: {
    color: "white",
    fontSize: 16,
    padding: 8,
  },
});

export default GoalItem;
