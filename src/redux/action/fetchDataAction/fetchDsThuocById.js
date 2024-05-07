import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../setup/axios";

export const fetchDsThuocByIdAction = createAsyncThunk(
  "fetchDsThuocById",
  async (maPK) => {
    try {
      // chỉnh lại các controller, sử dụng body request trong get
      const response = await axios.get("/donthuoc/ds-thuoc");
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
