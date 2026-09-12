import { configureStore } from "@reduxjs/toolkit";
import { todosReducer } from "./slices/todos.slice";
import { usersReducer } from "./slices/users.slice";
import { customersReducer } from "./slices/customers.slice";
import { shopsReducer } from "./slices/shops.slice";
import { bankReducer } from "./slices/bank.slice";
import { inventoryReducer } from "./slices/inventory.slice";
import { transactionsReducer } from "./slices/transactions.slice";

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    todosStore: todosReducer,
    usersStore: usersReducer,
    customers: customersReducer,
    shops: shopsReducer,
    bank: bankReducer,
    inventory: inventoryReducer,
    transactions: transactionsReducer,
  },
});

export default store;
