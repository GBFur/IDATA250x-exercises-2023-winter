import { createSlice } from "@reduxjs/toolkit";

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
