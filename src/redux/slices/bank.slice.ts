import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Bank, BankUpdate } from "../../types";
import { getBankByShopId, updateBank } from "../../api";

export const fetchBank = createAsyncThunk(
  "bank/fetchBank",
  async (shopId: number) => {
    const bank = await getBankByShopId(shopId);
    return bank;
  },
);

export const modifyBank = createAsyncThunk(
  "bank/modifyBank",
  async ([bankId, bank]: [number, BankUpdate]): Promise<Bank> => {
    const updatedBank = await updateBank(bankId, bank);
    return updatedBank as Bank;
  },
);

export const bankSlice = createSlice({
  name: "bank",
  initialState: {
    data: null as Bank | null,
    error: undefined as string | undefined,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBank.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchBank.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(fetchBank.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(modifyBank.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(modifyBank.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(modifyBank.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
  },
});

export const bankReducer = bankSlice.reducer;
