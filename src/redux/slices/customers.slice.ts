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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchCustomers.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(fetchCustomers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addCustomer.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
    builder.addCase(addCustomer.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(addCustomer.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeCustomer.fulfilled, (state, action) => {
      state.data = state.data.filter(
        (customer) => customer.id !== action.payload,
      );
    });
    builder.addCase(removeCustomer.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(removeCustomer.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const customersReducer = customersSlice.reducer;
