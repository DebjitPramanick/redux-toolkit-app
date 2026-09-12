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
    selectedShop: null as Shop | null,
  },
  reducers: {
    selectShop: (state, action: PayloadAction<Shop>) => {
      state.selectedShop = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShops.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchShops.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(fetchShops.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
  },
});

export const shopsReducer = shopsSlice.reducer;
export const { selectShop } = shopsSlice.actions;
