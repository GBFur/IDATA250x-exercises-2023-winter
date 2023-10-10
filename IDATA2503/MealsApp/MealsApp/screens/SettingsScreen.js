import { Box, Divider, Switch, Text, Pressable } from "@gluestack-ui/themed";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterActions } from "../store/redux/filter";

function SettingsScreen() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

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

  return (
    <Box px="$2">
      <Pressable
        space="md"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        py="$4"
        px="$4"
        onPress={handleGlutenFreeToggle}
      >
        <Box>
          <Text size="xl">Gluten-free</Text>
          <Text size="xs">Only include gluten-free meals.</Text>
        </Box>
        <Switch value={filters.isGlutenFree} onValueChange={handleGlutenFreeToggle}/>
      </Pressable>

      <Divider />

      <Pressable
        space="md"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        py="$4"
        px="$4"
        onPress={handleLactoseFreeToggle}
      >
        <Box>
          <Text size="xl">Lactose-free</Text>
          <Text size="xs">Only include lactose-free meals.</Text>
        </Box>
        <Switch value={filters.isLactoseFree} onValueChange={handleLactoseFreeToggle}/>
      </Pressable>

      <Divider />

      <Pressable
        space="md"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        py="$4"
        px="$4"
        onPress={handleVegetarianToggle}
      >
        <Box>
          <Text size="xl">Vegetarian</Text>
          <Text size="xs">Only include vegetarian meals.</Text>
        </Box>
        <Switch value={filters.isVegetarian} onValueChange={handleVegetarianToggle}/>
      </Pressable>

      <Divider />

      <Pressable
        space="md"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        py="$4"
        px="$4"
        onPress={handleVeganToggle}
      >
        <Box>
          <Text size="xl">Vegan</Text>
          <Text size="xs">Only include vegan meals</Text>
        </Box>
        <Switch value={filters.isVegan} onValueChange={handleVeganToggle}/>
      </Pressable>
    </Box>
  );
}

export default SettingsScreen;
