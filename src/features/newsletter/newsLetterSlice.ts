import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { z } from "zod";

const newsLetterSchema = z.object({
  firstName: z.string().regex(/^\p{L}{4,50}$/u),
  lastName: z.string().regex(/^\p{L}{4,50}$/u),
  email: z.string().regex(/^$/),
});

export const signUpToNewsLetter = createAsyncThunk(
  "newsletter/thunk",
  async () => {}
);

interface NewsLetterState {
  firstName: string;
  lastName: string;
  email: string;
}

const initialState = {};

const NewsLetterSlice = createSlice({
  name: "newsletter/slice",
  initialState,
  reducers: {},
});

export default NewsLetterSlice.reducer;
