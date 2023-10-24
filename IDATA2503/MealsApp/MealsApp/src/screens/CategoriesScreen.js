import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import CategoryGridTile from "../components/Category/CategoryGridTile";
import { CATEGORIES } from "../data/dummy-data";

/**
 * Screen for displaying a list of categories.
 */
function CategoriesScreen({ navigation }) {
  function renderCategoryItem(itemData) {
    function onPressHandler() {
      navigation.navigate("MealsOverview", { categoryId: itemData.item.id });
    }
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={onPressHandler}
      />
    );
  }

  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "#000000" : "#ffffff" }}>
      <FlatList
        data={CATEGORIES}
        key={(item) => item.id}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        numColumns={2}
      />
    </View>
  );
}

export default CategoriesScreen;
