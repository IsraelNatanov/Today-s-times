'use client';
import { configureStore } from "@reduxjs/toolkit";
import { ListDataInputsSlice } from "./features/listDataInputsSlice";

export const store = configureStore({
  reducer: {

    listDataInput: ListDataInputsSlice.reducer,

  },
});
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
