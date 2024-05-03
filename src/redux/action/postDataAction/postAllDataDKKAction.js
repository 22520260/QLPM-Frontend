import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../setup/axios";

export const postAllDataDKKAction = createAsyncThunk(
  "registration/submit",
  async ({formData }) => {
    try {
      const response = await axios.post('/benhnhan/insert', formData);
      console.log(response.data)

      return response.data;
    } catch (error) {
      throw Error("Failed to submit data");
    }
  }
);
