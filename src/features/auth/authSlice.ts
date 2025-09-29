import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { TCurrentUser } from "../../utils/Types";

interface AuthState {
  isAuthenticated: boolean | null;
  redirectTo: string | null;
  loading: boolean;
  error: string;
  currentUser: TCurrentUser | null;
}

interface ErrorShape {
  errorMessage: string;
  redirectTo: string;
}

export const checkAuthentication = createAsyncThunk<
  TCurrentUser,
  void,
  { rejectValue: ErrorShape }
>("check/authentication", async (_, { signal, rejectWithValue }) => {
  const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const endpoint = "auth";
  const fullURL: string = `${baseURL}/api/${endpoint}`;
  const fullOptions: RequestInit = {
    method: "GET",
    signal,
    credentials: "include",
  };
  try {
    const response = await fetch(fullURL, fullOptions);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        JSON.stringify({
          errorMessage: response.status.toString(),
          redirectTo: data.redirectTo,
        })
      );
    }
    return data;
  } catch (err) {
    const returnError: ErrorShape = JSON.parse(err as string);
    if (err instanceof DOMException && err.name === "AbortError") {
      return rejectWithValue({
        errorMessage: "Network Request Aborted ...",
        redirectTo: "/",
      });
    }
    if (err instanceof Error) {
      return rejectWithValue({
        errorMessage: returnError.errorMessage ?? "Unknown Error",
        redirectTo: returnError.redirectTo ?? "/",
      });
    }
    return rejectWithValue({
      errorMessage: "Unknown Error",
      redirectTo: "/",
    });
  }
});

const initialState: AuthState = {
  isAuthenticated: null,
  redirectTo: null,
  loading: false,
  error: "",
  currentUser: null,
};

export const authSlice = createSlice({
  name: "auth/slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkAuthentication.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(checkAuthentication.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.redirectTo = action.payload?.redirectTo ?? "/";
      state.error = action.payload?.errorMessage ?? "Unknown Error";
    });
    builder.addCase(
      checkAuthentication.fulfilled,
      (state, action: PayloadAction<TCurrentUser>) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.isAuthenticated = true;
        state.redirectTo = null;
      }
    );
  },
});

export default authSlice.reducer;
