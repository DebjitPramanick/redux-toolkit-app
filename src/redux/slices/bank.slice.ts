import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Bank, BankUpdate } from "../../types";
import { getBank, updateBank } from "../../api";

export const fetchBank = createAsyncThunk("bank/fetchBank", async () => {
  const bank = await getBank();
  return bank;
});

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
    data: [] as Bank[],
    error: undefined as string | undefined,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBank.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchBank.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(fetchBank.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(modifyBank.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
    builder.addCase(modifyBank.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(modifyBank.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const bankReducer = bankSlice.reducer;
