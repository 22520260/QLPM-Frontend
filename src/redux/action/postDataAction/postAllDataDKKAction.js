import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postAllDataDKKAction = createAsyncThunk(
  "registration/submit",
  async ({formData }) => {
    try {
      const response = await axios.post('http://localhost:3001/benhnhan/insert', formData);
      console.log(response.data)

      return response.data;
    } catch (error) {
      throw Error("Failed to submit data");
    }
  }
);
