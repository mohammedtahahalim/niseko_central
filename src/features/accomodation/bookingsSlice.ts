import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { FilterValue, SortingType } from "../../utils/Types";

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
  sort_order: boolean;
  previous_sort: SortingType | null;
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
  sort_order: true,
  previous_sort: null,
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
    sortBookings: (state, action: PayloadAction<SortingType>) => {
      if (state.previous_sort === action.payload) {
        state.sort_order = !state.sort_order;
      } else {
        state.previous_sort = action.payload;
        state.sort_order = true;
      }
      switch (action.payload) {
        case "price":
          break;
        case "name":
          break;
        case "size":
          break;
        case "bedrooms":
          break;
        case "discount":
          break;
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
export const { setFilter, sortBookings } = bookingSlice.actions;
