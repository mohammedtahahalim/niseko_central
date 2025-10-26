import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Property {}

interface BookingState<T extends Object> {
  loading: boolean;
  error: string;
  bookings: T[];
  displayBookings: T[];
  filters: {
    type: string;
    guests: number;
    property: string;
  };
  sort_order: "asc" | "desc";
}

export const fetchBookings = createAsyncThunk<
  void,
  Property,
  { rejectValue: string }
>("fetch/bookings", async () => {});

const initialState: BookingState<Property> = {
  loading: false,
  error: "",
  bookings: [],
  displayBookings: [],
  filters: {
    type: "",
    guests: 0,
    property: "",
  },
  sort_order: "desc",
};

export const bookingSlice = createSlice({
  name: "booking/slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBookings.pending, () => {});
    builder.addCase(fetchBookings.rejected, () => {});
    builder.addCase(fetchBookings.fulfilled, () => {});
  },
});
