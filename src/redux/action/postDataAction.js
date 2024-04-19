import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Action creator để gửi dữ liệu lên backend
export const submitData = createAsyncThunk(
  "registration/submit",
  async ({ url, formData }) => {
    try {
      console.log(formData)
      const response = await axios.post(url, formData);
      return response.data;
    } catch (error) {
      throw Error("Failed to submit data");
    }
  }
);
