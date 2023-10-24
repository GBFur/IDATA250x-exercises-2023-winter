import { configureStore } from "@reduxjs/toolkit";

import favoriteReducer from "./favorites";
import filterReducer from "./filter";

export const store = configureStore({
  reducer: {
    favoriteMeals: favoriteReducer,
    filters: filterReducer,
  },
});
