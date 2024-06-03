import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDSLHAction,
  fetchPkByIdHdAction,
  fetchLSKByIdBnAction,
} from "../../action/fetchDataAction/fetchDSLHAction";

const initialState = {
  data: [],
  isLoading: false,
  pkByIdHd: [],
  lskByIdBn: [],
};

const fetchDSLHSlice = createSlice({
  name: "DSLH",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDSLHAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDSLHAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchDSLHAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchPkByIdHdAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pkByIdHd = action.payload.data;
      })
      .addCase(fetchLSKByIdBnAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lskByIdBn = action.payload.data;
      });
  },
});

export default fetchDSLHSlice.reducer;
