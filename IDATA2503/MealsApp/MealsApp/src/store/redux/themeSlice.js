import { createSlice } from "@reduxjs/toolkit";

/**
 * A redux slice for the theme.
 * This slice is used to toggle the theme. (dark/light)
 */
const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDarkMode: false,
  },
  reducers: {
    toggleTheme(state) {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export default themeSlice.reducer;
export const themeActions = themeSlice.actions;
