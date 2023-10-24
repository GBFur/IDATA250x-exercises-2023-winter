import { createSlice } from "@reduxjs/toolkit";

/**
 * A redux slice for favorites.
 * This slice contains the ids of the favorite meals,
 * and the actions for adding and removing a favorite meal.
 */
const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    ids: [],
  },

  reducers: {
    addFavorite(state, action) {
      state.ids.push(action.payload);
    },

    removeFavorite(state, action) {
      state.ids = state.ids.filter((mealId) => mealId !== action.payload);
    },
  },
});

export default favoriteSlice.reducer;
export const favoriteActions = favoriteSlice.actions;
