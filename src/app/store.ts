import { configureStore } from "@reduxjs/toolkit";
import testSlice from "./slices/testSlice";

export const NisekoStore = configureStore({
  reducer: {
    test: testSlice,
  },
});

export type AppDisptach = typeof NisekoStore.dispatch;
export type RootState = ReturnType<typeof NisekoStore.getState>;
