import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Customer, CustomerCreate } from "../../types";
import { createCustomer, deleteCustomer, getCustomers } from "../../api";

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async () => {
    const customers = await getCustomers();
    return customers;
  },
);

export const addCustomer = createAsyncThunk(
  "customers/addCustomer",
  async (customer: CustomerCreate): Promise<Customer> => {
    console.log("Adding customer:", customer);
    const newCustomer = await createCustomer(customer);
    return newCustomer as Customer;
  },
);

export const removeCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (customerId: number): Promise<number> => {
    await deleteCustomer(customerId);
    return customerId;
  },
);

export const customersSlice = createSlice({
  name: "customers",
  initialState: {
    data: [] as Customer[],
    error: undefined as string | undefined,
    isLoading: false,
    selectedCustomer: null as Customer | null,
  },
  reducers: {
    selectCustomer: (state, action: PayloadAction<Customer>) => {
      state.selectedCustomer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCustomers.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(fetchCustomers.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(addCustomer.fulfilled, (state, action) => {
      state.data.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(addCustomer.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(addCustomer.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(removeCustomer.fulfilled, (state, action) => {
      state.data = state.data.filter(
        (customer) => customer.id !== action.payload,
      );
      state.isLoading = false;
    });
    builder.addCase(removeCustomer.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(removeCustomer.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
  },
});

export const customersReducer = customersSlice.reducer;
export const { selectCustomer } = customersSlice.actions;
