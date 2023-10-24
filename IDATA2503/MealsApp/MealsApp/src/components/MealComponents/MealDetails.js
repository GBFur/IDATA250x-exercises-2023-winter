import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

function MealDetails({ duration, complexity, affordability }) {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const styles = getStyles(isDarkMode);

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

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    informationContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: 30,
    },
    informationItem: {
      color: isDarkMode ? "#ffffff" : "#000000",
      marginHorizontal: 10,
    },
  });

export default MealDetails;
