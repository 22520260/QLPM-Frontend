import { createSlice } from '@reduxjs/toolkit';
import { submitData } from '../../action/postDataAction';

const submitSlice = createSlice({
    name: 'registration',
    initialState: {
      status: null,
      error: null,
    },
    extraReducers: builder => {
      builder
      .addCase(submitData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitData.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(submitData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    },
  });
  
  export default submitSlice.reducer;