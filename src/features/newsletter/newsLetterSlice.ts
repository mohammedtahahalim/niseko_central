import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { z } from "zod";
import type { RootState } from "../../app/store";

const newsLetterSchema = z.object({
  firstName: z
    .string()
    .trim()
    .regex(/^[\p{L}' -]{2,50}$/u, { message: "firstName" }),
  lastName: z
    .string()
    .trim()
    .regex(/^[\p{L}' -]{2,50}$/u, { message: "lastName" }),
  email: z
    .string()
    .trim()
    .regex(/^[\p{L}0-9._%+-]+@[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})+$/u, {
      message: "email",
    }),
});

export const signUpToNewsLetter = createAsyncThunk<
  void,
  void,
  { state: RootState; rejectValue: string[] }
>("newsletter/thunk", async (_, { signal, rejectWithValue, getState }) => {
  const { firstName, lastName, email } = getState().newsLetter;
  try {
    const isValidFormat = newsLetterSchema.safeParse({
      firstName,
      lastName,
      email,
    });
    if (!isValidFormat.success) {
      const errors = isValidFormat.error.issues.map((issue) => issue.message);
      return rejectWithValue(errors);
    }
    const options: RequestInit = {
      method: "post",
      signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email }),
    };
    const url: string = `${import.meta.env.VITE_API_URL}/api/newsletter`;
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(response.status.toString());
    }
    return;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return rejectWithValue(["network"]);
    }
    if (err instanceof Error) {
      return rejectWithValue([err] as unknown as string[]);
    }
    return rejectWithValue(["unknown"]);
  }
});

interface NewsLetterState {
  firstName: string;
  lastName: string;
  email: string;
  errors: string[] | null;
  loading: boolean;
  hasRegistered: boolean | null;
}

const initialState: NewsLetterState = {
  firstName: "",
  lastName: "",
  email: "",
  errors: null,
  loading: false,
  hasRegistered: null,
};

export const newsLetterSlice = createSlice({
  name: "newsletter/slice",
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    reset: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.email = "";
    },
    resetError: (state) => {
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpToNewsLetter.pending, (state) => {
      state.loading = true;
      state.errors = null;
    });
    builder.addCase(signUpToNewsLetter.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload ?? ["unknown"];
    });
    builder.addCase(signUpToNewsLetter.fulfilled, (state) => {
      state.loading = false;
      state.errors = null;
      state.hasRegistered = true;
    });
  },
});

export default newsLetterSlice.reducer;

export const { setFirstName, setLastName, setEmail, reset, resetError } =
  newsLetterSlice.actions;
