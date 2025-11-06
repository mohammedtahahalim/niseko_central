import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchProperty = createAsyncThunk("fetch/property", async () => {});

const initialState = {};

export const propertySlice = createSlice({
  name: "property/slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProperty.pending, () => {});
    builder.addCase(fetchProperty.rejected, () => {});
    builder.addCase(fetchProperty.fulfilled, () => {});
  },
});

export default propertySlice.reducer;
