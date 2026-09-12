import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Customer, Inventory, InventoryUpdate } from "../../types";
import { getInventory, updateInventory } from "../../api";

export const fetchInventory = createAsyncThunk(
  "inventory/fetchInventory",
  async () => {
    const inventory = await getInventory();
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
    data: [] as Inventory[],
    error: undefined as string | undefined,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInventory.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchInventory.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(fetchInventory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(modifyInventory.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
    builder.addCase(modifyInventory.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(modifyInventory.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const inventoryReducer = inventorySlice.reducer;
