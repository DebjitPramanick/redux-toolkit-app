import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Bank, Transaction, TransactionCreate } from "../../types";
import { createTransaction, getTransactions } from "../../api";

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
