import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../components/Buttons/IconButton";
import MealDetails from "../components/MealComponents/MealDetails";
import { MEALS } from "../data/dummy-data";
import { favoriteActions } from "../store/redux/favorites";

/**
 * Screen for displaying details of a meal.
 */
function MealDetailScreen({ route, navigation }) {
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();

  const mealId = route.params.mealId;
  const mealIsFavorite = favoriteMealIds.includes(mealId);
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const styles = getStyles(isDarkMode);

  const showAddFavoriteToast = () => {
    Toast.show({
      type: "success",
      position: "bottom",
      text1: "Added to favorites",
      visibilityTime: 5000,
      autoHide: true,
    });
  };

  const showRemoveFavoriteToast = () => {
    Toast.show({
      type: "error",
      position: "bottom",
      text1: "Removed from favorite",
      visibilityTime: 5000,
      autoHide: true,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          onPress={changeFavoriteStatusHandler}
          color="#1477d4"
          icon={mealIsFavorite ? "favorite" : "favorite-outline"}
        />
      ),
    });
  }, [mealIsFavorite, navigation]);

  function changeFavoriteStatusHandler() {
    if (mealIsFavorite) {
      showRemoveFavoriteToast();
      dispatch(favoriteActions.removeFavorite(mealId));
    } else {
      showAddFavoriteToast();
      dispatch(favoriteActions.addFavorite(mealId));
    }
  }

  return (
    <ScrollView style={styles.wrap}>
      <View style={styles.container}>
        <View style={styles.centerContainer}>
          <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
          <Text style={styles.title}>{selectedMeal.title}</Text>
        </View>

        <MealDetails
          affordability={selectedMeal.affordability}
          complexity={selectedMeal.complexity}
          duration={selectedMeal.duration}
          imageUrl={selectedMeal.imageUrl}
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.ingridientContainer}>
          <Text style={styles.title}>Ingredients</Text>

          {selectedMeal.ingredients.map((ingredient) => (
            <Text key={ingredient} style={styles.ingridient}>
              {ingredient}
            </Text>
          ))}
        </View>

        <View style={styles.stepsContainer}>
          <Text style={styles.title}>Steps</Text>
          {selectedMeal.steps.map((step) => (
            <Text key={step} style={styles.steps}>
              {step}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    wrap: {
      flex: 1,
      backgroundColor: isDarkMode ? "#000000" : "#ffffff",
    },
    container: {
      backgroundColor: isDarkMode ? "#000000" : "#ffffff",
      elevation: 5,
      marginBottom: 20,
    },
    image: {
      width: "100%",
      height: 200,
      borderRadius: 10,
      overflow: "hidden",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: isDarkMode ? "#ffffff" : "#000000",
      marginBottom: 10,
    },
    centerContainer: {
      alignItems: "center",
      padding: 10,
    },
    infoContainer: {
      backgroundColor: isDarkMode ? "#000000" : "#ffffff",
      padding: 15,
      borderRadius: 10,
      elevation: 5,
    },
    ingridientContainer: {
      padding: 10,
      flexDirection: "column",
      width: "100%",
      borderRadius: 10,
      backgroundColor: isDarkMode ? "#020202" : "#fafafa",
      marginBottom: 15,
    },
    ingridient: {
      fontSize: 16,
      marginVertical: 5,
      paddingLeft: 10,
      color: isDarkMode ? "#ffffff" : "#000000",
    },
    stepsContainer: {
      padding: 10,
      flexDirection: "column",
      width: "100%",
      borderRadius: 10,
      backgroundColor: isDarkMode ? "#020202" : "#fafafa",
    },
    steps: {
      fontSize: 16,
      marginVertical: 5,
      paddingLeft: 10,
      color: isDarkMode ? "#ffffff" : "#000000",
    },
  });

export default MealDetailScreen;
