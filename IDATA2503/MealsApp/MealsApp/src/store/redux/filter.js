import { createSlice } from "@reduxjs/toolkit";

/**
 * A redux slice for filters.
 * This slice is used to filter the meals.
 */
const filterSlice = createSlice({
  name: "filters",
  initialState: {
    isGlutenFree: false,
    isLactoseFree: false,
    isVegetarian: false,
    isVegan: false,
  },

  reducers: {
    setGlutenFree(state, action) {
      state.isGlutenFree = action.payload;
    },
    setLactoseFree(state, action) {
      state.isLactoseFree = action.payload;
    },
    setVegetarian(state, action) {
      state.isVegetarian = action.payload;
    },
    setVegan(state, action) {
      state.isVegan = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const filterActions = filterSlice.actions;
