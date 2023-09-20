import { Pressable, Text, View, Image, StyleSheet } from "react-native";

function MealItem({ title, imageUrl, duration, complexity, affordability }) {
  return (
    <View style={styles.mealItem}>
      <View style={styles.container}>
        <Pressable android_ripple={{ color: "#b8b8b8" }}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: imageUrl }} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.informationContainer}>
            <Text style={styles.informationItem}>{duration}m</Text>
            <Text style={styles.informationItem}>
              {complexity.toUpperCase()}
            </Text>
            <Text style={styles.informationItem}>
              {affordability.toUpperCase()}
            </Text>
          </View>
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
  informationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
  },
  informationItem: {
    marginHorizontal: 10,
  },
});

export default MealItem;
