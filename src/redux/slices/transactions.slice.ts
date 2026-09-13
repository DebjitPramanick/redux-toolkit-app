import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { Bank, StoreState, Transaction, TransactionCreate } from "../../types";
import { createTransaction, getTransactions } from "../../api";
import { RootState } from "@reduxjs/toolkit/query";

export const fetchTransactions = createAsyncThunk(
  "bank/fetchTransactions",
  async (shopId: number) => {
    const transactions = await getTransactions(shopId);
    return transactions;
  },
);

export const addTransaction = createAsyncThunk(
  "bank/addTransaction",
  async (transaction: TransactionCreate): Promise<Transaction> => {
    const newTransaction = await createTransaction(transaction);
    return newTransaction as Transaction;
  },
);

export const selectTransactions = createSelector(
  [
    (state: StoreState) => state.transactions.data,
    (
      _state,
      filters?: {
        customerQuery?: string;
        amountRange?: [number | null, number | null];
      },
    ) => filters,
  ],
  (transactions, filters) => {
    if (!filters) {
      return transactions;
    }

    const { customerQuery, amountRange } = filters;
    let filteredTransactions = [...transactions];

    if (customerQuery?.trim()) {
      filteredTransactions = transactions.filter((transaction) =>
        transaction.customer.name
          .toLowerCase()
          .includes(customerQuery.trim().toLowerCase()),
      );
    }
    if (amountRange && amountRange.every((value) => !!value)) {
      console.log(amountRange);
      filteredTransactions = filteredTransactions.filter(
        (transaction) =>
          transaction.amount >= amountRange[0]! &&
          transaction.amount <= amountRange[1]!,
      );
    }

    return filteredTransactions;
  },
);

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    data: [] as Transaction[],
    error: undefined as string | undefined,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(fetchTransactions.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(addTransaction.fulfilled, (state, action) => {
      state.data.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(addTransaction.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(addTransaction.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
  },
});

export const transactionsReducer = transactionsSlice.reducer;
