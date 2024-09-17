import { createSlice } from "@reduxjs/toolkit";
import { authLogin } from "../services/authservices";
const authCases = [
  {
    api: authLogin ,
    name: "authLogin",
  },

];
let initialState = {};

authCases.forEach((api) => {
  initialState[api.name] = {
    loading: false,
    data: null,
    error: null,
  };
});

export const authSlice = createSlice({
  name:"auth",
  initialState,
  extraReducers: (builder) => {
    authCases.forEach((cases) => {
      builder
        .addCase(cases.api.fulfilled, (state, { payload }) => {
          state[cases.name].loading = false;
          state[cases.name].data = payload;
          state[cases.name].error = null;
        })
        .addCase(cases.api.pending, (state) => {
          state[cases.name].loading = true;
          state[cases.name].error = null;
        })
        .addCase(cases.api.rejected, (state, { payload }) => {
          state[cases.name].loading = false;
          state[cases.name].error = payload;
        });
    });
  },
});

export default authSlice.reducer;
