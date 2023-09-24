import { View, Text, StyleSheet, Image } from "react-native";

function MealDetails({ duration, complexity, affordability }) {
  return (
    <View>
      <View style={styles.informationContainer}>
        <Text style={styles.informationItem}>{duration}m</Text>
        <Text style={styles.informationItem}>{complexity.toUpperCase()}</Text>
        <Text style={styles.informationItem}>
          {affordability.toUpperCase()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  informationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
  },
  informationItem: {
    marginHorizontal: 10,
  },
});

export default MealDetails;
