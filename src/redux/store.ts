'use client';
import { configureStore } from "@reduxjs/toolkit";
import { ListDataInputsSlice } from "./features/listDataInputsSlice";
import { ScheduleSlice } from "./features/scheduleSlice";

export const store = configureStore({
  reducer: {

    listDataInput: ListDataInputsSlice.reducer,
    scheduleSlice: ScheduleSlice.reducer,

  },
});
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
