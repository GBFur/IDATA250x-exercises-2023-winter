import { Box, Divider, Pressable, Switch, Text } from "@gluestack-ui/themed";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "../store/redux/filter";
import { themeActions } from "../store/redux/themeSlice";

const SettingToggle = ({
  title,
  description,
  value,
  onValueChange,
  isDarkMode,
}) => (
  <Pressable
    space="md"
    flexDirection="row"
    justifyContent="space-between"
    alignItems="center"
    py="$4"
    px="$4"
    onPress={onValueChange}
    backgroundColor={isDarkMode ? "#000000" : "#FFFFFF"} // Conditional styling based on dark mode
  >
    <Box>
      <Text size="xl" color={isDarkMode ? "white" : "black"}>
        {title}
      </Text>
      <Text size="xs" color={isDarkMode ? "white" : "black"}>
        {description}
      </Text>
    </Box>
    <Switch value={value} onValueChange={onValueChange} />
  </Pressable>
);

function SettingsScreen() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const handleGlutenFreeToggle = () => {
    dispatch(filterActions.setGlutenFree(!filters.isGlutenFree));
  };

  const handleLactoseFreeToggle = () => {
    dispatch(filterActions.setLactoseFree(!filters.isLactoseFree));
  };

  const handleVegetarianToggle = () => {
    dispatch(filterActions.setVegetarian(!filters.isVegetarian));
  };

  const handleVeganToggle = () => {
    dispatch(filterActions.setVegan(!filters.isVegan));
  };

  const handleDarkModeToggle = () => {
    dispatch(themeActions.toggleTheme());
  };

  return (
    <Box px="$2" flex={1} backgroundColor={isDarkMode ? "#000000" : "#ffffff"}>
      <SettingToggle
        title="Gluten-free"
        description="Only include gluten-free meals."
        value={filters.isGlutenFree}
        onValueChange={handleGlutenFreeToggle}
        isDarkMode={isDarkMode}
      />
      <Divider />

      <SettingToggle
        title="Lactose-free"
        description="Only include lactose-free meals."
        value={filters.isLactoseFree}
        onValueChange={handleLactoseFreeToggle}
        isDarkMode={isDarkMode}
      />
      <Divider />

      <SettingToggle
        title="Vegetarian"
        description="Only include vegetarian meals."
        value={filters.isVegetarian}
        onValueChange={handleVegetarianToggle}
        isDarkMode={isDarkMode}
      />
      <Divider />

      <SettingToggle
        title="Vegan"
        description="Only include vegan meals."
        value={filters.isVegan}
        onValueChange={handleVeganToggle}
        isDarkMode={isDarkMode}
      />
      <Divider />

      <SettingToggle
        title="Dark Mode"
        description="Toggle dark mode on/off."
        value={isDarkMode}
        onValueChange={handleDarkModeToggle}
        isDarkMode={isDarkMode}
      />
    </Box>
  );
}

export default SettingsScreen;
