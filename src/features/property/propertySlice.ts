import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchProperty = createAsyncThunk("fetch/property", async () => {});

interface PropertySliceState {
  loading: boolean;
  error: string | null;
  shouldRedirect: boolean;
  propertyData: any;
}

const initialState: PropertySliceState = {
  loading: false,
  error: null,
  shouldRedirect: false,
  propertyData: null,
};

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
