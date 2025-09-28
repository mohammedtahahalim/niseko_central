import { configureStore } from "@reduxjs/toolkit";
import testSlice from "./slices/testSlice";
import authSlice from "../features/auth/authSlice";

export const NisekoStore = configureStore({
  reducer: {
    test: testSlice,
    auth: authSlice,
  },
});

export type AppDispatch = typeof NisekoStore.dispatch;
export type RootState = ReturnType<typeof NisekoStore.getState>;
