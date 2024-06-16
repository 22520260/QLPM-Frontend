import { createSlice } from '@reduxjs/toolkit';
import { fetchAllPhongKhamAction } from '../../action/fetchDataAction/fetchAllPhongKhamAction';

const initialState = {
  data: [],
  isLoading: false,
};

const fetchPhongKhamSlice = createSlice({
  name: 'fetchPhongKham',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllPhongKhamAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllPhongKhamAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchAllPhongKhamAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchPhongKhamSlice.reducer;
