import { FlatList, View } from "react-native";
import MealItem from "./MealItem";

function MealsList({ displayedMeals }) {
  function renderMealItem(itemData) {
    const mealItemProps = {
      id: itemData.item.id,
      title: itemData.item.title,
      imageUrl: itemData.item.imageUrl,
      duration: itemData.item.duration,
      complexity: itemData.item.complexity,
      affordability: itemData.item.affordability,
      isGlutenFree: itemData.item.isGlutenFree,
      isVegan: itemData.item.isVegan,
      isVegetarian: itemData.item.isVegetarian,
      isLactoseFree: itemData.item.isLactoseFree,
    };

    return <MealItem {...mealItemProps} />;
  }

  return (
    <View>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

export default MealsList;
