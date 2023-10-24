import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import MealsList from "../components/MealComponents/MealsList";
import { CATEGORIES, MEALS } from "../data/dummy-data";

/**
 * Screen for displaying a list of meals in a category.
 */
function MealsOverviewScreen({ route, navigation }) {
  const categoryId = route.params.categoryId;
  const filters = useSelector((state) => state.filters);

  const displayedMeals = MEALS.filter((mealItem) => {
    if (filters.isGlutenFree && !mealItem.isGlutenFree) return false;
    if (filters.isLactoseFree && !mealItem.isLactoseFree) return false;
    if (filters.isVegetarian && !mealItem.isVegetarian) return false;
    if (filters.isVegan && !mealItem.isVegan) return false;
    return mealItem.categoryIds.indexOf(categoryId) >= 0;
  });

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === categoryId
    ).title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [categoryId, navigation]);

  if (displayedMeals.length === 0 || !displayedMeals) {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>No meals found.</Text>
      </View>
    );
  } else {
    return <MealsList displayedMeals={displayedMeals} />;
  }
}

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

export default MealsOverviewScreen;
