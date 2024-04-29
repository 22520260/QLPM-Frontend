import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedRow: {}, // Đối tượng lưu trữ thông tin hàng được chọn
};

const selectedRowSlice = createSlice({
  name: 'selectedRow',
  initialState,
  reducers: {
    selectRow: (state, action) => {
      state.selectedRow = action.payload; // Cập nhật thông tin hàng được chọn
    },
    clearSelectedRow: (state) => {
      state.selectedRow = {}; // Xóa thông tin hàng được chọn
    },
  },
});

export const { selectRow, clearSelectedRow } = selectedRowSlice.actions;

export default selectedRowSlice.reducer;
