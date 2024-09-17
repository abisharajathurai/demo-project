
import ApiHelper from "@/utills/ApiHelper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createProduct= createAsyncThunk(
    "createProduct",
    async (formData, thunkApi) => {
      try {
        const response = await ApiHelper.post( "/posts/add",formData );
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
  // edit
  export const updateProduct= createAsyncThunk(
    "createProduct",
    async (params, thunkApi) => {
      try {
        const response = await ApiHelper.put( `/posts/${params.id}`,params.formData );
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
  export const singleProduct= createAsyncThunk(
    "singleProduct",
    async ( id, thunkApi) => {
      try {
        const response = await ApiHelper.get( `/posts/${id}` );
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );

  export const deleteProduct= createAsyncThunk(
    "deleteProduct",
    async ( id, thunkApi) => {
      try {
        const response = await ApiHelper.delete( `/posts/${id}` );
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );