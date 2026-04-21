import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { TCurrentUser } from "../../utils/Types";

type Status = "idle" | "loading" | "failure" | "success";

interface AuthState {
  isAuthenticated: boolean | null;
  redirectTo: string | null;
  status: Status;
  error: string;
  currentUser: TCurrentUser | null;
}

interface ResponseData {
  currentUser: TCurrentUser;
  isAuthenticated: boolean;
  redirectTo: string;
}

export const checkAuthentication = createAsyncThunk<
  ResponseData,
  void,
  { rejectValue: string }
>("check/authentication", async (_, { signal, rejectWithValue }) => {
  const base = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const fullURL: URL = new URL("/api/auth", base);
  console.log(fullURL);
  const fullOptions: RequestInit = {
    method: "GET",
    signal,
    credentials: "include",
  };
  try {
    const response = await fetch(fullURL, fullOptions);
    if (!response.ok) {
      throw new Error(response.status.toString());
    }
    const data = await response.json();
    return data;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return rejectWithValue("Network Request Aborted ...");
    }
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue("Unknow Error");
  }
});

const initialState: AuthState = {
  isAuthenticated: null,
  redirectTo: null,
  status: "idle",
  error: "",
  currentUser: null,
};

export const authSlice = createSlice({
  name: "auth/slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkAuthentication.pending, (state) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(checkAuthentication.rejected, (state, action) => {
      state.status = "failure";
      state.redirectTo = "/";
      state.error = action.payload ?? "Unknown Error";
    });
    builder.addCase(checkAuthentication.fulfilled, (state, action) => {
      state.currentUser = action.payload.currentUser;
      state.status = "success";
      state.isAuthenticated = action.payload.isAuthenticated;
      state.redirectTo = action.payload.redirectTo;
    });
  },
});

export default authSlice.reducer;
