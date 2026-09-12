import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = createAsyncThunk("users", async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [] as User[],
    isLoading: false,
    error: null as string | null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = [
        ...state.users,
        ...action.payload.map((user: User) => ({
          id: user.id,
          name: user.name,
          email: user.email,
        })),
      ];
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Failed to fetch users";
    });
  },
  reducers: {},
});

export const usersReducer = usersSlice.reducer;
