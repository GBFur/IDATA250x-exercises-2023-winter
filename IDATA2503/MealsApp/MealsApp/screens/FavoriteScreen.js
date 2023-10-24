import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import MealsList from "../components/MealComponents/MealsList";
import { MEALS } from "../data/dummy-data";

/**
 * Screen for displaying a list of favorite meals.
 */
function FavoriteScreen() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const FavoriteMealsState = useSelector((state) => state.favoriteMeals);
  const favoriteMeals = MEALS.filter((meal) =>
    FavoriteMealsState.ids.includes(meal.id)
  );

  const styles = getStyles(isDarkMode);

  if (favoriteMeals.length === 0 || !favoriteMeals) {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>
          No favorite meals found. Start adding some!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <MealsList displayedMeals={favoriteMeals} />
    </View>
  );
}

export default FavoriteScreen;

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: isDarkMode ? "#000000" : "#ffffff",
    },
    screen: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: isDarkMode ? "#000000" : "#ffffff",
    },
    title: {
      fontWeight: "bold",
      fontSize: 18,
      textAlign: "center",
      color: isDarkMode ? "#ffffff" : "#000000",
    },
  });
