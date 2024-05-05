// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchUserAccountAction } from "../../action/fetchDataAction/fetchUserAccountAction";

const initialState = {
  user: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoading = false;

      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAccountAction.pending, (state) => {
        state.isLoading = true;
        state.user = state.user;
      })
      .addCase(fetchUserAccountAction.fulfilled, (state, action) => {
        state.isLoading = false;
        const groupWithRoles = action.payload.data.groupWithRoles;
        const username = action.payload.data.username;
        const token = action.payload.data.access_token; // token chứa username và groupWithRoles
  
        const data = {
          isAuthenticated: true,
          token,
          account: {
            groupWithRoles,
            username
          }
        };

        state.user = data;

      })
      .addCase(fetchUserAccountAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;

      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
