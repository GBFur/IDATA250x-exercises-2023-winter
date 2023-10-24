import { configureStore } from "@reduxjs/toolkit";

import favoriteReducer from "./favorites";
import filterReducer from "./filter";
import themeReducer from "./themeSlice";

/**
 * A redux store. This store contains the reducers from the redux slices.
 */
export const store = configureStore({
  reducer: {
    favoriteMeals: favoriteReducer,
    filters: filterReducer,
    theme: themeReducer,
  },
});
