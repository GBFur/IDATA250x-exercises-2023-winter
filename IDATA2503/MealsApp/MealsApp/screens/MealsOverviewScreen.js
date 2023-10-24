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

  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const styles = getStyles(isDarkMode);

  if (displayedMeals.length === 0 || !displayedMeals) {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>No meals found.</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.main}>
        <MealsList displayedMeals={displayedMeals} />
      </View>
    );
  }
}

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: isDarkMode ? "#000000" : "#ffffff",
    },
    screen: {
      flex: 1,
      backgroundColor: isDarkMode ? "#000000" : "#ffffff",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: isDarkMode ? "#000000" : "#ffffff",
    },
    title: {
      color: isDarkMode ? "#ffffff" : "#000000",
      fontWeight: "bold",
      fontSize: 18,
      textAlign: "center",
    },
  });

export default MealsOverviewScreen;
