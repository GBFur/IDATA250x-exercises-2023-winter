import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import MealDetails from "./MealDetails";
import { useSelector } from "react-redux";

function MealItem({
  id,
  title,
  imageUrl,
  duration,
  complexity,
  affordability,
  isGlutenFree,
  isVegan,
  isVegetarian,
  isLactoseFree,
}) {
  const navigation = useNavigation();

  function selectMealItemHandler() {
    navigation.navigate("MealDetail", { mealId: id });
  }

  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.mealItem}>
      <View style={styles.container}>
        <Pressable
          android_ripple={{ color: "#b8b8b8" }}
          onPress={selectMealItemHandler}
        >
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: imageUrl }} />
            {(isGlutenFree || isVegan || isLactoseFree || isVegetarian) && (
              <View style={styles.infoBox}>
                {isVegan && <Text style={styles.infoText}>Vegan</Text>}
                {isGlutenFree && (
                  <Text style={styles.infoText}>Gluten-free</Text>
                )}
                {isVegetarian && (
                  <Text style={styles.infoText}>Vegetarian</Text>
                )}
                {isLactoseFree && (
                  <Text style={styles.infoText}>Lactose-free</Text>
                )}
              </View>
            )}
            <Text style={styles.title}>{title}</Text>
          </View>
          <MealDetails
            duration={duration}
            complexity={complexity}
            affordability={affordability}
          />
        </Pressable>
      </View>
    </View>
  );
}

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    mealItem: {
      padding: 10,
      backgroundColor: isDarkMode ? "#000000" : "#ffffff",
      overflow: "hidden",
    },
    container: {
      backgroundColor: isDarkMode ? "#000000" : "#ffffff",
      borderRadius: 10,
      elevation: 3,
    },
    image: {
      borderRadius: 10,
      width: "100%",
      height: 200,
    },
    title: {
      fontSize: 18,
      color: isDarkMode ? "#ffffff" : "#000000",
      fontWeight: "bold",
    },
    imageContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    infoBox: {
      position: "absolute",
      bottom: 40,
      left: 10,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      borderRadius: 5,
      padding: 5,
    },
    infoText: {
      color: "white",
      fontSize: 12,
    },
  });

export default MealItem;
