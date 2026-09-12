import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../types";

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [] as Todo[],
    total: 0,
  },
  reducers: {
    addTodo: (state, action: PayloadAction<{ title: string }>) => {
      state.todos.push({
        id: state.todos.length + 1,
        title: action.payload.title,
        completed: false,
      });
      state.total++;

      console.log(state, action);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      console.log(action);
      const idx = state.todos.findIndex((todo) => todo.id === action.payload);
      if (idx === -1) {
        console.error("Todo not found.");
        return;
      }
      state.todos.splice(idx, 1);
      state.total--;
    },
  },
});

export const todosReducer = todosSlice.reducer;
export const addTodo = todosSlice.actions.addTodo;
export const deleteTodo = todosSlice.actions.deleteTodo;
