import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BankUpdate,
  InventoryUpdate,
  SellCakePayload,
  Shop,
  StoreState,
  TransactionCreate,
  TransactionType,
} from "../../types";
import { getShops } from "../../api";
import { modifyInventory } from "./inventory.slice";
import { addTransaction } from "./transactions.slice";
import { modifyBank } from "./bank.slice";

const TRANSACTION_TYPES: Record<string, TransactionType> = {
  DEPOSIT: "deposit",
  WITHDRAWAL: "withdrawal",
};

export const fetchShops = createAsyncThunk("shops/fetchShops", async () => {
  const shops = await getShops();
  return shops;
});

export const sellCake = createAsyncThunk<void, SellCakePayload>(
  "shops/sellCake",
  async (payload: SellCakePayload, { dispatch, getState }) => {
    const { cake_count, amount } = payload;
    const { inventory, bank, customers, shops } = getState() as StoreState;

    const selectedInventory = inventory.data;
    const selectedBank = bank.data;
    const selectedCustomer = customers.selectedCustomer;
    const selectedShop = shops.selectedShop;

    if (
      !selectedInventory ||
      !selectedBank ||
      !selectedCustomer ||
      !selectedShop
    ) {
      throw new Error("Selected shop, inventory, bank, or customer not found");
    }

    if (selectedInventory.cake_count < cake_count) {
      throw new Error("Not enough cakes in inventory");
    }

    const newInventory: InventoryUpdate = {
      cake_count: (selectedInventory?.cake_count ?? 0) - cake_count,
    };
    const newBank: BankUpdate = {
      balance: (bank.data?.balance ?? 0) + amount,
    };
    const newTransaction: TransactionCreate = {
      shop_id: selectedShop.id,
      customer_id: selectedCustomer.id,
      bank_id: selectedBank.id,
      type: TRANSACTION_TYPES.DEPOSIT,
      amount: amount,
    };

    await dispatch(modifyInventory([selectedInventory.id, newInventory]));
    await dispatch(modifyBank([selectedBank.id, newBank]));
    await dispatch(addTransaction(newTransaction));
  },
);

export const shopsSlice = createSlice({
  name: "shops",
  initialState: {
    data: [] as Shop[],
    error: undefined as string | undefined,
    isLoading: false,
    selectedShop: null as Shop | null,
    isProcessingSale: false,
    errorSale: undefined as string | undefined,
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
    builder.addCase(sellCake.fulfilled, (state, action) => {
      state.isProcessingSale = false;
      state.errorSale = undefined;
    });
    builder.addCase(sellCake.rejected, (state, action) => {
      state.isProcessingSale = false;
      state.errorSale = action.error.message;
    });
    builder.addCase(sellCake.pending, (state) => {
      state.isProcessingSale = true;
      state.errorSale = undefined;
    });
  },
});

export const shopsReducer = shopsSlice.reducer;
export const { selectShop } = shopsSlice.actions;
