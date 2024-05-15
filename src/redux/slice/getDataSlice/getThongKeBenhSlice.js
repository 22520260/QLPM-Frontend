import { createSlice } from '@reduxjs/toolkit';
import { fetchThongKeBenhAction } from '../../action/fetchDataAction/fetchThongKeBenhAction';

const initialState = {
  data: [],
  isLoading: false,
};

const fetchThongKeBenhSlice = createSlice({
  name: 'fetchThongKeBenh',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchThongKeBenhAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchThongKeBenhAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchThongKeBenhAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchThongKeBenhSlice.reducer;
