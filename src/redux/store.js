import { combineReducers, configureStore } from "@reduxjs/toolkit";
import homeSlice from "./slice/homeSlice";
import authSlice from "./slice/authSlice";
import { createWrapper } from "next-redux-wrapper";

export const rootReducer = combineReducers({
home:homeSlice,
auth:authSlice
  });
  const makeStore = () =>
    configureStore({
        reducer: rootReducer,
    });
export const wrapper = createWrapper( makeStore, {debug: false});