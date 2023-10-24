import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../components/IconButton";
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

  navigation.setOptions({
    headerRight: () => (
      <IconButton
        onPress={changeFavoriteStatusHandler}
        color="#1477d4"
        icon={mealIsFavorite ? "favorite" : "favorite-outline"}
      />
    ),
  });

  function changeFavoriteStatusHandler() {
    if (mealIsFavorite) {
      dispatch(favoriteActions.removeFavorite(mealId));
    } else {
      dispatch(favoriteActions.addFavorite(mealId));
    }
  }

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.centerContainer}>
          <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
          <Text>{selectedMeal.title}</Text>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
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
    color: "#333",
    marginBottom: 10,
  },
  centerContainer: {
    alignItems: "center",
    padding: 10,
  },
  infoContainer: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  ingridientContainer: {
    padding: 10,
    flexDirection: "column",
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    marginBottom: 15,
  },
  ingridient: {
    fontSize: 16,
    marginVertical: 5,
    paddingLeft: 10,
    color: "#555",
  },
  stepsContainer: {
    padding: 10,
    flexDirection: "column",
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },
  steps: {
    fontSize: 16,
    marginVertical: 5,
    paddingLeft: 10,
    color: "#555",
  },
});

export default MealDetailScreen;
