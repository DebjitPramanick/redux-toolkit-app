import { configureStore } from "@reduxjs/toolkit";
import { todosReducer } from "./slices/todos.slice";
import { usersReducer } from "./slices/users.slice";

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: { todosStore: todosReducer, usersStore: usersReducer },
});

export default store;
