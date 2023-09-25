import { Pressable, Text, View, Image, StyleSheet } from "react-native";
import MealDetails from "../MealDetails";
import { useNavigation } from "@react-navigation/native";

function MealItem({
  id,
  title,
  imageUrl,
  duration,
  complexity,
  affordability,
}) {
  const navigation = useNavigation();

  function selectMealItemHandler() {
    navigation.navigate("MealDetail", { mealId: id });
  }

  return (
    <View style={styles.mealItem}>
      <View style={styles.container}>
        <Pressable
          android_ripple={{ color: "#b8b8b8" }}
          onPress={selectMealItemHandler}
        >
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: imageUrl }} />
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

const styles = StyleSheet.create({
  mealItem: {
    padding: 10,
    backgroundColor: "white",
    overflow: "hidden",
  },
  container: {
    backgroundColor: "#f9f9f9",
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
    fontWeight: "bold",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealItem;
