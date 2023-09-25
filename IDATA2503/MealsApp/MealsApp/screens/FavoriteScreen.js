import { StyleSheet, View, Text } from "react-native";
import MealsList from "../components/MealsList/MealsList";
import { useContext } from "react";
import { FavoritesContext } from "../store/context/favorites-context";
import { MEALS } from "../data/dummy-data";
import { useSelector } from "react-redux";

function FavoriteScreen() {

  const FavoriteMealsState = useSelector(state => state.favoriteMeals)
  const favoriteMeals = MEALS.filter(meal => FavoriteMealsState.ids.includes(meal.id))

  if (favoriteMeals.length === 0 || !favoriteMeals) {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>No favorite meals found. Start adding some!</Text>
      </View>
    )
  }

  return (
    <MealsList displayedMeals={favoriteMeals} />
  );
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
  }
})
