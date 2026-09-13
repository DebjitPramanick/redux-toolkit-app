import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Customer, Inventory, InventoryUpdate } from "../../types";
import { getInventory, updateInventory } from "../../api";

export const fetchInventory = createAsyncThunk(
  "inventory/fetchInventory",
  async (shopId: number) => {
    const inventory = await getInventory(shopId);
    return inventory;
  },
);

export const modifyInventory = createAsyncThunk(
  "inventory/modifyInventory",
  async ([inventoryId, inventory]: [
    number,
    InventoryUpdate,
  ]): Promise<Inventory> => {
    const updatedInventory = await updateInventory(inventoryId, inventory);
    return updatedInventory as Inventory;
  },
);

export const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    data: null as Inventory | null,
    error: undefined as string | undefined,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInventory.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchInventory.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(fetchInventory.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(modifyInventory.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(modifyInventory.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(modifyInventory.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
  },
});

export const inventoryReducer = inventorySlice.reducer;
