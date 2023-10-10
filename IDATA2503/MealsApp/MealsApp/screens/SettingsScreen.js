import { Box, Divider, Switch, Text } from "@gluestack-ui/themed";
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
      <Box
        space="md"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        py="$4"
        px="$4"
      >
        <Box>
          <Text size="xl">Gluten-free</Text>
          <Text size="xs">Only include gluten-free meals.</Text>
        </Box>
        <Switch defaultValue={false} onValueChange={handleGlutenFreeToggle} />
      </Box>

      <Divider />

      <Box
        space="md"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        py="$4"
        px="$4"
      >
        <Box>
          <Text size="xl">Lactose-free</Text>
          <Text size="xs">Only include lactose-free meals.</Text>
        </Box>
        <Switch defaultValue={false} onValueChange={handleLactoseFreeToggle} />
      </Box>

      <Divider />

      <Box
        space="md"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        py="$4"
        px="$4"
      >
        <Box>
          <Text size="xl">Vegetarian</Text>
          <Text size="xs">Only include vegetarian meals.</Text>
        </Box>
        <Switch defaultValue={false} onValueChange={handleVegetarianToggle} />
      </Box>

      <Divider />

      <Box
        space="md"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        py="$4"
        px="$4"
      >
        <Box>
          <Text size="xl">Vegan</Text>
          <Text size="xs">Only include vegan meals</Text>
        </Box>
        <Switch defaultValue={false} onValueChange={handleVeganToggle} />
      </Box>
    </Box>
  );
}

export default SettingsScreen;
