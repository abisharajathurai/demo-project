
import ApiHelper from "@/utills/ApiHelper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authLogin= createAsyncThunk(
    "authLogin",
    async (formData, thunkApi) => {
      try {
        const response = await ApiHelper.post('/auth/login',formData );
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );