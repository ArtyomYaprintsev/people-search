import { configureStore } from "@reduxjs/toolkit";
import peopleApi from "./people/people.api";

const store = configureStore({
  reducer: {
    [peopleApi.reducerPath]: peopleApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(peopleApi.middleware),
});

export default store;
