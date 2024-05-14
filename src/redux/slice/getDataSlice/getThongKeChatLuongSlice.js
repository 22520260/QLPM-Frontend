import { createSlice } from '@reduxjs/toolkit';
import { fetchThongKeChatLuongAction } from '../../action/fetchDataAction/fetchThongKeChatLuongAction';

const initialState = {
  data: [],
  isLoading: false,
};

const fetchThongKeChatLuongSlice = createSlice({
  name: 'fetchThongKeChatLuong',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchThongKeChatLuongAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchThongKeChatLuongAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchThongKeChatLuongAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchThongKeChatLuongSlice.reducer;
