import { createSlice } from '@reduxjs/toolkit';
import { postAllDataDKKAction } from '../../action/postDataAction/postAllDataDKKAction';

const submitSlice = createSlice({
    name: 'registration',
    initialState: {
      status: null,
      error: null,
      isCreating: false, // Thêm trường để lưu dữ liệu từ backend
    },
    extraReducers: builder => {
      builder
      .addCase(postAllDataDKKAction.pending, (state) => {
        state.status = 'loading';
        state.isCreating = true;
      })
      .addCase(postAllDataDKKAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isCreating = false;
      })
      .addCase(postAllDataDKKAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.isCreating = false;
      });
    },
  });
  
  export default submitSlice.reducer;