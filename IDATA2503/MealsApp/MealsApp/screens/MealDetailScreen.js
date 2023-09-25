import { useLayoutEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import IconButton from "../components/IconButton";
import MealDetails from "../components/MealDetails";
import { MEALS } from "../data/dummy-data";
import { useDispatch, useSelector } from "react-redux";
import { favoriteActions } from "../store/redux/favorites";

function MealDetailScreen({ route, navigation }) {
  // const favoriteMealContext = useContext(FavoritesContext);
  const favoriteMealIds = useSelector(state => state.favoriteMeals.ids)
  const dispatch = useDispatch();

  const mealId = route.params.mealId;

  const mealIsFavorite = favoriteMealIds.includes(mealId);

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            onPress={changeFavoriteStatusHandler}
            color="black"
            icon={mealIsFavorite ? "star" : "star-outline"}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  function changeFavoriteStatusHandler() {
    if (mealIsFavorite) {
      //favoriteMealContext.removeFavorite(mealId);
      dispatch(favoriteActions.removeFavorite(mealId));
    } else {
      dispatch(favoriteActions.addFavorite(mealId));
      //favoriteMealContext.addFavorite(mealId);
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
    marginBottom: 3,
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  centerContainer: {
    alignItems: "center",
  },
  infoContainer: {
    backgroundColor: "#ffffffff",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
    borderTopWidth: 3,
    borderColor: "#ffffffff",
  },
  ingridientContainer: {
    padding: 5,
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#e1e1e136",
    borderRadius: 10,
  },
  ingridient: {
    margin: 5,
    width: "100%",
    backgroundColor: "#a9a9a936",
    borderRadius: 10,
    textAlign: "center",
  },
  steps: {
    margin: 5,
    width: "100%",
    backgroundColor: "#a9a9a936",
    textAlign: "center",
  },
  stepsContainer: {
    marginTop: 5,
    flexDirection: "column",
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "#e1e1e136",
    borderRadius: 10,
  },
});

export default MealDetailScreen;
