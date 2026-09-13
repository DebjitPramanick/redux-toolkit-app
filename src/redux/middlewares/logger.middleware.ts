import { createListenerMiddleware, Middleware } from "@reduxjs/toolkit";

export const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  // action -> dispatched actions
  // store.getState() -> current state
  // next(action) -> next middleware or reducer
  // return result -> result of the next middleware or reducer

  const result = next(action);
  return result;
};

export const listenerMiddleware = createListenerMiddleware();
