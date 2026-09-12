import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Shop } from "../../types";
import { getShops } from "../../api";

export const fetchShops = createAsyncThunk("shops/fetchShops", async () => {
  const shops = await getShops();
  return shops;
});

export const shopsSlice = createSlice({
  name: "shops",
  initialState: {
    data: [] as Shop[],
    error: undefined as string | undefined,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchShops.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchShops.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(fetchShops.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const shopsReducer = shopsSlice.reducer;
