import ApiHelper from "@/utills/ApiHelper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const ProductListing = createAsyncThunk(
  "ProductListing",
  async ( thunkApi) => {
    try {
      const response = await ApiHelper.get(`/posts`);
      return response;
    } catch (error)  {
     console.log(error)
     return thunkApi.rejectWithValue(Error);
   }
  }
);