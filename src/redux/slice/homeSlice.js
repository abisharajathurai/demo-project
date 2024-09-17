import { createSlice } from "@reduxjs/toolkit";
import { ProductListing } from "../services/homeServices";
import { createProduct,singleProduct,deleteProduct } from "../services/formServices";
const homeCases = [
  {
    api: ProductListing,
    name: "ProductListing",
  },
 {
    api:  createProduct,
    name: "createProduct",
  },
  {
    api: singleProduct,
    name: "singleProduct",
  },
  {
    api: deleteProduct,
    name: "deleteProduct",
  },
];
let initialState = {};

homeCases.forEach((api) => {
  initialState[api.name] = {
    loading: false,
    data: null,
    error: null,
  };
});

export const homeSlice = createSlice({
  name:"home",
  initialState,
  extraReducers: (builder) => {
    homeCases.forEach((cases) => {
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

export default homeSlice.reducer;
