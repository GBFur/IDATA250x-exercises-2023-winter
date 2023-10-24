import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import MealsList from "../components/MealComponents/MealsList";
import { MEALS } from "../data/dummy-data";

/**
 * Screen for displaying a list of favorite meals.
 */
function FavoriteScreen() {
  const FavoriteMealsState = useSelector((state) => state.favoriteMeals);
  const favoriteMeals = MEALS.filter((meal) =>
    FavoriteMealsState.ids.includes(meal.id)
  );

  if (favoriteMeals.length === 0 || !favoriteMeals) {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>
          No favorite meals found. Start adding some!
        </Text>
      </View>
    );
  }

  return <MealsList displayedMeals={favoriteMeals} />;
}

export default FavoriteScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});
