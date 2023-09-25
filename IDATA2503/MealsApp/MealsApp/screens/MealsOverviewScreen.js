import { MEALS, CATEGORIES } from "../data/dummy-data";
import { View, Text, StyleSheet, FlatList } from "react-native";
import MealItem from "../components/MealsList/MealItem";
import React, { useLayoutEffect } from "react";
import MealsList from "../components/MealsList/MealsList";

function MealsOverviewScreen({ route, navigation }) {
  const categoryId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
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

  return (
    <MealsList displayedMeals={displayedMeals} />
  );
}
export default MealsOverviewScreen;
