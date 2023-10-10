import React, { useLayoutEffect } from "react";
import MealsList from "../components/MealsList/MealsList";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import { useSelector } from "react-redux";

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

  return <MealsList displayedMeals={displayedMeals} />;
}
export default MealsOverviewScreen;
