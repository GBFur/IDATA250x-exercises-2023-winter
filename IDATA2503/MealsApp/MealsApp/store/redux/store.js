import { configureStore } from "@reduxjs/toolkit";

import favoriteReducer from "./favorites";
import filterReducer from "./filter";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    favoriteMeals: favoriteReducer,
    filters: filterReducer,
    theme: themeReducer,
  },
});