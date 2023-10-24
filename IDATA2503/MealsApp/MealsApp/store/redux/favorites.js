import { createSlice } from "@reduxjs/toolkit";

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
