import { configureStore } from "@reduxjs/toolkit";
import { todosReducer } from "./slice";

const store = configureStore({
  reducer: { todosStore: todosReducer },
});

export default store;
