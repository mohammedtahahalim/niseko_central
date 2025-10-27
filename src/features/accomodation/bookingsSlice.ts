import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { FilterValue } from "../../utils/Types";

interface Property {}

interface BookingState<T extends Object> {
  loading: boolean;
  error: string;
  bookings: T[];
  displayBookings: T[];
  filters: {
    type: number;
    guests: number;
    property: number;
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
    type: 0,
    guests: 0,
    property: 0,
  },
  sort_order: "desc",
};

export const bookingSlice = createSlice({
  name: "booking/slice",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterValue>) => {
      const { filter, value } = action.payload;
      if (filter === "guests") {
        state.filters.guests = value;
      } else if (filter === "type") {
        state.filters.type = value;
      } else if (filter === "property") {
        state.filters.property = value;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBookings.pending, () => {});
    builder.addCase(fetchBookings.rejected, () => {});
    builder.addCase(fetchBookings.fulfilled, () => {});
  },
});

export default bookingSlice.reducer;
export const { setFilter } = bookingSlice.actions;
